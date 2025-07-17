from django.shortcuts import render, redirect
from django.http import Http404
from django.utils.timezone import make_aware
from django.utils.dateparse import parse_datetime
from todo.models import Task


def index(request):
    if request.method == "POST":
        due_str = request.POST.get("due_at")
        due_at = None
        if due_str:
            dt = parse_datetime(due_str)
            if dt:
                due_at = make_aware(dt)
        task = Task(title=request.POST["title"], due_at=due_at)
        task.save()

    show_completed = request.GET.get("show_completed") == "1"

    if request.GET.get("order") == "due":
        tasks = Task.objects.order_by("due_at")
    else:
        tasks = Task.objects.order_by("-posted_at")

    if not show_completed:
        tasks = tasks.filter(completed=False)

    context = {
        "tasks": tasks,
        "show_completed": show_completed,
    }
    return render(request, "todo/index.html", context)


def detail(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
    except Task.DoesNotExist:
        raise Http404("Task does not exitst")

    context = {
        "task": task,
    }
    return render(request, "todo/detail.html", context)


def delete(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
    except Task.DoesNotExist:
        raise Http404("Task does not exist")
    task.delete()
    return redirect(index)


def close(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
    except Task.DoesNotExist:
        raise Http404("Task does not exist")
    task.completed = True
    task.save()
    return redirect(index)


def update(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
    except Task.DoesNotExist:
        raise Http404("Task does not exitst")

    if request.method == "POST":
        due_str = request.POST.get("due_at")
        due_at = None
        if due_str:
            dt = parse_datetime(due_str)
            if dt:
                due_at = make_aware(dt)

        task.title = request.POST["title"]
        task.due_at = due_at
        task.save()
        return redirect(detail, task_id)

    context = {
        "task": task
    }
    return render(request, "todo/edit.html", context)
