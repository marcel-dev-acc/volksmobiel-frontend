import webview

if __name__ == "__main__":
    webview.create_window('Title', 'build/index.html', width=320, height=480)
    webview.start()