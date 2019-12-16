try {
	throw new Error('エラーよ！')
	console.log('error')
} catch (err) {
	console.log(err)
} finally {
	console.log('絶対実行されるよ！')
}