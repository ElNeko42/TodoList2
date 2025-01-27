using Microsoft.EntityFrameworkCore;
using TodoList2.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configurar Entity Framework Core con InMemoryDatabase
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TodoList"));

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Configurar fallback para React
app.MapFallbackToFile("/index.html");

app.Run();
