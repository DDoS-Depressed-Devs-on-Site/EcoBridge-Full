# Create the main 'instance' directory
$baseDir = "instance"
$instance1 = Join-Path $baseDir "instance1"
$instance2 = Join-Path $baseDir "instance2"

New-Item -ItemType Directory -Path $instance1 -Force | Out-Null
New-Item -ItemType Directory -Path $instance2 -Force | Out-Null

# Copy main.py and the src folder into both instances
Copy-Item -Path "main.py" -Destination $instance1 -Force
Copy-Item -Path "main.py" -Destination $instance2 -Force
# Copy-Item -Path "latest_block.txt" -Destination $instance1 -Force
# Copy-Item -Path "latest_block.txt" -Destination $instance2 -Force
Copy-Item -Path "src" -Destination $instance1 -Recurse -Force
Copy-Item -Path "src" -Destination $instance2 -Recurse -Force

# Get absolute paths
$absPath1 = Resolve-Path $instance1
$absPath2 = Resolve-Path $instance2

# Launch two new terminals and run main.py from each instance folder
Start-Process cmd -ArgumentList "/k", "cd /d `"$absPath1`" && python -m debugpy --listen 5678 main.py --host 0.0.0.0 --port 8080 --node2port 8081"
Start-Process cmd -ArgumentList "/k", "cd /d `"$absPath2`" && python -m debugpy --listen 5679 main.py --host 0.0.0.0 --port 8081 --node2port 8080"
 