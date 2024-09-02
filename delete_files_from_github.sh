#!/bin/bash

# נווט לתיקייה שבה נמצאים קבצי האתר שלך
cd /C/Users/Eliran\ Ashwal/Desktop/InnovativeBroomShop

# הסרת כל הקבצים מהמאגר ב-GitHub (ללא מחיקתם מהמחשב המקומי)
git rm -r --cached .

# יצירת commit למחיקת הקבצים מהמאגר
git commit -m "Remove all files from GitHub repository"

# דחיפת השינויים ל-branch הנכון ב-GitHub
git push origin main  # שנה ל-branch הרצוי אם הוא לא 'master'
