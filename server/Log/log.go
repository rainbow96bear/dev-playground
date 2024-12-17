package Log

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"
	"time"
)

type Log struct {
	filter string

	debug bool
	info  bool
	warn  bool
	error bool
	fatal bool
}

func (l *Log)Init(filter string) (error) {
	// filter 형식이 맞지 않으면 default 값 적용
	if isFilterFormat(filter) {
		l.filter = DefaultFilter
	}

	l.setFilter(l.filter)

	return nil
}

func (l *Log)setFilter(filter string) {
	// 키와 필드의 매핑
	fields := []func(bool){
		func(val bool) { l.debug = val },
		func(val bool) { l.info = val },
		func(val bool) { l.warn = val },
		func(val bool) { l.error = val },
		func(val bool) { l.fatal = val },
	}

	// filter를 순회하며 매핑된 필드 설정
	for i, value := range strings.Split(filter, "") {
		if i >= len(fields) { // filter 길이가 필드보다 길면 중단
			break
		}
		fields[i](value == "1") // "1"이면 true, 그 외는 false
	}
}

func (l *Log)Debug(content string) {
	if !l.debug {
		return
	}
	// **develop**
	// multiWriter := io.MultiWriter(os.Stdout, logFile) -> 옵션 값에 따라 파일로 저장하는 로직으로 수정 예정
	timestamp, file, line := getLogInfo()
	fmt.Fprintf(os.Stdout,LOGFORMAT, timestamp, Green,"DEBUG", Reset, file, line, content)
}

func (l *Log)Info(content string) {
	if !l.info {
		return
	}
	timestamp, file, line := getLogInfo()
	fmt.Fprintf(os.Stdout,LOGFORMAT, timestamp, Blue,"INFO", Reset, file, line, content)
}

func (l *Log)Warn(content string) {
	if !l.warn {
		return
	}
	timestamp, file, line := getLogInfo()
	fmt.Fprintf(os.Stdout,LOGFORMAT, timestamp, Yellow, "WARN", Reset, file, line, content)
}

func (l *Log)Error(content string) {
	if !l.error {
		return
	}
	timestamp, file, line := getLogInfo()
	fmt.Fprintf(os.Stdout,LOGFORMAT, timestamp, Magenta, "ERROR", Reset, file, line, content)
}

func (l *Log)Fatal(content string) {
	if !l.fatal {
		return
	} 
	timestamp, file, line := getLogInfo()
	fmt.Fprintf(os.Stdout,LOGFORMAT, timestamp, Red, "FATAL", Reset, file, line, content)
}


func isFilterFormat(filter string) bool {
	valid, _ := regexp.MatchString(fmt.Sprintf("^[01]{%d}$", len(DefaultFilter)), filter)
    return valid
}

func getLogInfo() (Timestamp, File string, Line int) {
	// 현재 시간 가져오기
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// 호출자 정보 가져오기
	_, file, line, ok := runtime.Caller(LOGDEPTH) // 1은 호출 스택의 깊이
	if !ok {
		return timestamp, "unknown", 0
	}
	
	return timestamp, filepath.Base(file), line
	
}