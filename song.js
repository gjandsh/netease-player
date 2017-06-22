$(function(){
	$.get('/lyric.json').then(function(object){
		console.log(1)
		let {lyric} = object
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string, index){
			let matches = string.match(regex)	
			if(matches){
				return {time: matches[1], words: matches[2]}
			}
		})
		let $lyric = $('.lyric')
		array.map(function(object){
			if(!object){return}
			let $p = $('<p/>')
			$p.attr('data-time', object.time).text(object.words)
			$p.appendTo($lyric.children('.lines'))
		})
	})

	let audio = document.createElement('audio')
	audio.src = '//dl.stream.qqmusic.qq.com/C400001hs89m3C5p3g.m4a?vkey=3BDCFB7B4C9964E543F19A51C9CDA42F2D7913F0946762463358CF0066D248A3428517B33E3CC45A9B1794FF54647ACEB58DBD9511D256C6&guid=4875181776&uin=0&fromtag=66'
	let i=0;
	let rotateDeg
	audio.oncanplay = function(){
		audio.play()
		setInterval(function(){
			rotateDeg=i*360/20;
			i++
		},1000)
		$('.disc-container').addClass('playing')
		$('.pointer').removeClass('leaveDisc')
	}	
	$('.icon-pause').on('click', function(){
		audio.pause()	
		// $('.cover').css("transform",`rotateZ(${rotateDeg+18}deg)`)
		$('.disc-container').removeClass('playing')
		$('.pointer').addClass('leaveDisc')
		console.log(rotateDeg)
		
		
	})
	$('.icon-play').on('click', function(){
		audio.play()	
		$('.disc-container').addClass('playing')
	    $('.pointer').removeClass('leaveDisc')
	})
})