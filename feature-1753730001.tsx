```python
import json
import os

def process_json_files(directory):
    """
    Processes all JSON files in the given directory, extracting and summing "value" 
    from objects where "name" is "John". Returns the total sum and a list of 
    filenames where "John" was found.
    """
    total_value = 0
    john_files = []

    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, 'r') as f:
                    data = json.load(f)
                    for item in data:
                        if isinstance(item, dict) and item.get("name") == "John":
                            value = item.get("value")
                            if isinstance(value, (int, float)):
                                total_value += value
                                john_files.append(filename)

            except json.JSONDecodeError:
                print(f"Skipping invalid JSON file: {filename}")


    return total_value, john_files

if __name__ == "__main__":

    directory = "data"  # Replace with the actual directory

    if not os.path.exists(directory):
        os.makedirs(directory)

        # Create dummy JSON files for demonstration
        with open(os.path.join(directory, "file1.json"), "w") as f:
            json.dump([{"name": "John", "value": 10}, {"name": "Jane", "value": 5}], f)
        with open(os.path.join(directory, "file2.json"), "w") as f:
            json.dump([{"name": "Peter", "value": 7}, {"name": "John", "value": 15}], f)
        with open(os.path.join(directory, "file3.json"), "w") as f:
            json.dump([{"name": "John", "value": 20}, {"name": "Alice", "value": 12}], f)

    total_sum, files_with_john = process_json_files(directory)

    print("Total value for John:", total_sum)
    print("Files containing John's data:", files_with_john)
```
