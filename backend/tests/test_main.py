import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture
def client():
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")


async def test_root(client):
    async with client as c:
        response = await c.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "API is running"}


async def test_health(client):
    async with client as c:
        response = await c.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}

