package main

import (
	logger "dev-playground/Log"
)

var log = logger.Log{}

func init(){
	// **develop**
	// build 시 확인하는 옵션 값으로 log  filter 적용
	log.Init(logger.DefaultFilter)
}

func main() {
	log.Debug("debug")
	log.Info("info")
	log.Warn("warn")
	log.Error("error")
	log.Fatal("fatal")
}