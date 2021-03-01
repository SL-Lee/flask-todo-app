from flask import Blueprint, abort
from flask_login import current_user, login_required
from flask_restx import Api, Resource, apidoc, inputs, reqparse

from models import Todo, TodoSchema, User, db

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

    post_parser = reqparse.RequestParser(bundle_errors=True)
    post_parser.add_argument("todoTitle", required=True, location="form")
    post_parser.add_argument("todoContents", location="form")

    put_parser = post_parser.copy()
    put_parser.add_argument("todoId", required=True, type=int, location="form")

    patch_parser = reqparse.RequestParser(bundle_errors=True)
    patch_parser.add_argument(
        "todoId", required=True, type=int, location="form"
    )
    patch_parser.add_argument(
        "todoCompleted", required=True, type=inputs.boolean, location="form"
    )

    delete_parser = patch_parser.copy()
    delete_parser.remove_argument("todoCompleted")

    @api.response(201, "Created")
    @api.response(401, "Unauthorized")
    def post(self):
        if not current_user.is_authenticated:
            abort(401)

        args = self.post_parser.parse_args()
        user = User.query.get(current_user.id)
        new_todo = Todo(title=args["todoTitle"], contents=args["todoContents"])
        user.todos.append(new_todo)
        db.session.add(new_todo)
        db.session.commit()
        return {"status": "Success"}, 201

    @api.response(200, "OK")
    @api.response(401, "Unauthorized")
    def get(self):
        if not current_user.is_authenticated:
            abort(401)

        return self.schema.dump(
            Todo.query.filter_by(user_id=current_user.id).all(), many=True
        )

    @api.response(200, "OK")
    @api.response(401, "Unauthorized")
    def put(self):
        if not current_user.is_authenticated:
            abort(401)

        args = self.put_parser.parse_args()
        todo = Todo.query.filter_by(
            id=args["todoId"], user_id=current_user.id
        ).first()

        if todo is None:
            return {"status": "Not found"}

        todo.title = args["todoTitle"]
        todo.contents = args["todoContents"]
        db.session.commit()
        return {"status": "Success"}

    @api.expect(patch_parser)
    @api.response(200, "OK")
    @api.response(401, "Unauthorized")
    def patch(self):
        if not current_user.is_authenticated:
            abort(401)

        args = self.patch_parser.parse_args()
        todo = Todo.query.filter_by(
            id=args["todoId"], user_id=current_user.id
        ).first()

        if todo is None:
            return {"status": "Not found"}

        todo.completed = args["todoCompleted"]
        db.session.commit()
        return {"status": "Success"}

    @api.expect(delete_parser)
    @api.response(200, "OK")
    @api.response(401, "Unauthorized")
    def delete(self):
        if not current_user.is_authenticated:
            abort(401)

        args = self.delete_parser.parse_args()
        todo = Todo.query.filter_by(
            id=args["todoId"], user_id=current_user.id
        ).first()

        if todo is None:
            return {"status": "Not found"}

        db.session.delete(todo)
        db.session.commit()
        return {"status": "Success"}
