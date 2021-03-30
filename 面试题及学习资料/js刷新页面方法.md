js刷新页面方法

1. reload： 强迫浏览器刷新当前页面
2. replace：用指定url替换当前url，此方法不能前进不能后退
3. + history.go(0)
4. + location=location
5. + location.assign(location)
6. + document.execCommand(‘refresh’)
7. + window.navigate(location)
8. + document.URL = location.href


1. 页面自动刷新
<meta http-equiv='refresh' content='20'>

2. 页面自动跳转

<meta http-equiv='refresh' content='20' ; url='xxxx'>





跳转重定向 / js页面跳转

1. window.location.href = 'XXX'
2. alert('返回') window.history.back(-1)
3. window.navigate('XXX')
4. self.location = ‘XXX’
5. alert(‘XXX’)  top.location = ‘XXX’