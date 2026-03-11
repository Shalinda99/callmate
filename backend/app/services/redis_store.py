import redis
import json
from app.core.config import settings
from typing import Optional, Dict, Any

class RedisSessionStore:
    def __init__(self):
        self.client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
    
    def save_session(self, call_id: str, state: Dict[str, Any], ttl_seconds: int = 3600):
        """Save conversation state to Redis."""
        self.client.set(f"call_session:{call_id}", json.dumps(state), ex=ttl_seconds)
        
    def get_session(self, call_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve conversation state from Redis."""
        data = self.client.get(f"call_session:{call_id}")
        if data:
            return json.loads(data)
        return None
        
    def update_session(self, call_id: str, updates: Dict[str, Any]):
        """Update specific fields in conversation state."""
        state = self.get_session(call_id) or {}
        state.update(updates)
        self.save_session(call_id, state)

    def delete_session(self, call_id: str):
        """Remove a session from Redis."""
        self.client.delete(f"call_session:{call_id}")

store = RedisSessionStore()
