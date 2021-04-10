export DATABASE_PWD = shXQFqAanK5cxetKcB392sE6kYy4t8KAkcHxtmB7DDL9GREnXBSnuhWTMshQWxNC
export DATABASE_USER = container
export DATABASE_NAME = codegrounds_backend

dev:
	@docker-compose -p codegrounds_backend -f .compose/development.yaml up --build --renew-anon-volumes

prod:
	@docker-compose -p codegrounds_backend -f .compose/production.yaml down
	@docker-compose -p codegrounds_backend -f .compose/production.yaml up -d --build
