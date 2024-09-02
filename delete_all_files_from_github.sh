# מחיקת כל הקבצים כולל הסקריפט מהמאגר ב-GitHub
git rm -r --cached *

# מחיקת הסקריפט מהמחשב המקומי אחרי שהוא רץ
rm delete_all_files_from_github.sh

# יצירת commit למחיקת הקבצים מהמאגר
git commit -m "Delete all files from GitHub repository, including script"

# דחיפת השינויים למחיקת כל התוכן ב-branch 'main' ב-GitHub
git push origin main
