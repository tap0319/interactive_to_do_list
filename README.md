# interactive_to_do_list

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>To-Do List</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="todo-container">
    <h1>My To-Do List</h1>
    <div class="input-group">
      <input type="text" id="task-input" placeholder="Enter a new task..." />
      <button id="add-task-btn">Add</button>
    </div>
    <ul id="task-list"></ul>
  </div>

  <div id="notification" class ="notification"></div>

  <script src="script.js"></script>

  <audio id="sound-add" src="audio/add notification.wav" preload="auto"></audio>
  <audio id="sound-complete" src="audio/completed notification.wav" preload="auto"></audio>
  <audio id="sound-delete" src="audio/deleted.wav" preload="auto"></audio>

</body>
</html>
