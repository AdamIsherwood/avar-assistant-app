```python
import tkinter as tk
import tkinter.ttk as ttk

def calculate_grade():
    try:
        score = float(entry_score.get())
        if score >= 90:
            grade = "A"
        elif score >= 80:
            grade = "B"
        elif score >= 70:
            grade = "C"
        elif score >= 60:
            grade = "D"
        else:
            grade = "F"
        label_grade.config(text=f"Grade: {grade}")
    except ValueError:
        label_grade.config(text="Invalid input")

root = tk.Tk()
root.title("Grade Calculator")

label_score = ttk.Label(root, text="Enter score:")
label_score.grid(row=0, column=0, padx=5, pady=5)

entry_score = ttk.Entry(root)
entry_score.grid(row=0, column=1, padx=5, pady=5)

button_calculate = ttk.Button(root, text="Calculate", command=calculate_grade)
button_calculate.grid(row=1, column=0, columnspan=2, pady=5)

label_grade = ttk.Label(root, text="Grade:")
label_grade.grid(row=2, column=0, columnspan=2, pady=5)

root.mainloop()

```