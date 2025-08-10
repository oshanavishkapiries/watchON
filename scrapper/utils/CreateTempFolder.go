package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"time"
	"strings"
)

func CreateTempFolder(title, extension string) (string, error) {
	safeTitle := strings.ReplaceAll(title, " ", "_")
	timestamp := time.Now().Unix()
	folderName := fmt.Sprintf("watchON-%s%d.%s", safeTitle, timestamp, extension)
	tempDir := os.TempDir()
	fullPath := filepath.Join(tempDir, folderName)

	err := os.MkdirAll(fullPath, 0755)
	if err != nil {
		return "", err
	}
	return fullPath, nil
}