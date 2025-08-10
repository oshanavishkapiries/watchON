package utils

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

// FindChromePath searches for Chrome/Chromium executable across OSes
func FindChromePath() string {
	// Common executable names
	candidates := []string{
		"chrome",
		"google-chrome",
		"chromium",
		"chromium-browser",
	}

	// OS-specific paths
	var paths []string

	switch runtime.GOOS {
	case "windows":
		programFiles := []string{
			os.Getenv("ProgramFiles"),
			os.Getenv("ProgramFiles(x86)"),
			os.Getenv("LocalAppData"),
		}
		for _, base := range programFiles {
			paths = append(paths,
				filepath.Join(base, "Google", "Chrome", "Application", "chrome.exe"),
				filepath.Join(base, "Chromium", "Application", "chromium.exe"),
			)
		}
	case "darwin": // macOS
		paths = append(paths,
			"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
			"/Applications/Chromium.app/Contents/MacOS/Chromium",
		)
	case "linux":
		// Use exec.LookPath to find in $PATH
		for _, name := range candidates {
			if path, err := exec.LookPath(name); err == nil {
				return path
			}
		}
		// Fallback to common install locations
		paths = append(paths,
			"/usr/bin/google-chrome",
			"/usr/bin/chromium",
			"/usr/bin/chromium-browser",
			"/snap/bin/chromium",
		)
	}

	// Check if any of the paths exist
	for _, path := range paths {
		if _, err := os.Stat(path); err == nil {
			return path
		}
	}

	return "" // Not found
}
