from flask import Blueprint, abort
from flask_login import current_user, login_required
from flask_restx import Api, Resource, apidoc, reqparse

from models import Todo, TodoSchema, db

api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(
    api_blueprint,
    title="Todo API",
    description="Documentation for the Todo API",
    doc="/doc/",
)


@api.documentation
@login_required
def api_documentation():
    return apidoc.ui_for(api)


@api.route("/todos")
class Todos(Resource):
    schema = TodoSchema()

    delete_parser = reqparse.RequestParser(bundle_errors=True)
    delete_parser.add_argument(
        "todoId", required=True, type=int, location="form"
    )

    @api.response(200, "Success")
    @api.response(401, "Authentication failed")
    def get(self):
        if not current_user.is_authenticated:
            abort(401)

        return self.schema.dump(
            Todo.query.filter_by(user_id=current_user.id).all(), many=True
        )

    @api.expect(delete_parser)
    @api.response(200, "Success")
    @api.response(401, "Authentication failed")
    def delete(self):
        if not current_user.is_authenticated:
            abort(401)

        args = self.delete_parser.parse_args()

        if (todo := Todo.query.filter_by(id=args["todoId"]).first()) is None:
            return {"status": "Not found"}

        db.session.delete(todo)
        db.session.commit()
        return {"status": "Success"}
