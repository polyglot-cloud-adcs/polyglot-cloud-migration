using Microsoft.AspNetCore.Mvc;

namespace PolyglotApi.Controllers;

[ApiController]
[Route("api")]
public class TasksController : ControllerBase
{
    private static List<string> _tasks = new List<string> { "Task 1", "Task 2" };

    [HttpGet("status")]
    public IActionResult GetStatus()
    {
        return Ok(new { status = "API is running!", version = "v1.0" });
    }

    [HttpGet("tasks")]
    public IActionResult GetTasks()
    {
        return Ok(_tasks);
    }

    [HttpPost("tasks")]
    public IActionResult AddTask([FromBody] TaskRequest request)
    {
        _tasks.Add(request.Name);
        return Ok(new { message = "Task added!", task = request.Name });
    }
}

public class TaskRequest
{
    public string Name { get; set; } = "";
}