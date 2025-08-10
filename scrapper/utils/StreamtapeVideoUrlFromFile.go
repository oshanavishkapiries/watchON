package utils

import (
	"os"
	"regexp"
	"strings"
)

func StreamtapeVideoUrlFromFile(path string) string {
	// Read the file content
	content, err := os.ReadFile(path)
	if err != nil {
		return ""
	}

	// Use the same regex to find the video URL
	re := regexp.MustCompile(`src="([^"]*streamtape\.com/get_video[^"]*)`)
	match := re.FindStringSubmatch(string(content))
	if len(match) < 2 {
		return ""
	}
	url := strings.ReplaceAll("https:"+match[1], "&amp;", "&")
	return url
}
