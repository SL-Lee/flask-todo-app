from flask import Blueprint, render_template
from flask_login import login_required

todo_app_blueprint = Blueprint("todo_app", __name__, url_prefix="/app")


@todo_app_blueprint.route("/")
@login_required
def todo_app():
    return render_template("app.html")
