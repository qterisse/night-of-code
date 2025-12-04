SHELL := /bin/bash

.DEFAULT_GOAL := up

up:
	docker compose up --build -d

down:
	docker compose down

restart:
	docker compose down && docker compose up --build -d

fclean:
	docker compose down --rmi all --volumes

aggressivecleanup:
	docker compose down --volumes --remove-orphans || true
	docker images -aq | xargs -r docker rmi -f
	docker system prune -af --volumes

re: fclean up

container:
	docker compose ps

logs:
	docker compose logs -f

backend-logs:
	docker compose logs -f backend

frontend-sh:
	docker exec -it frontend sh

# gateway-logs:
# 	docker compose logs -f gateway

ps:
	docker compose ps

exec:
	docker compose exec backend sh