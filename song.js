$(function(){
	$.get('./lyric.json').then(function(object){
		//console.log(object)
		let {lyric} = object // 等同于lyric = object.lyric
		let array = lyric.split('\n')
		console.log(array)
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string, index){
			let matches = string.match(regex)	
			console.log(matches)
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
	audio.src = '//os5kf123g.bkt.clouddn.com/2d15%252Fd9fd%252F57cd%252F6679396a63ff496ecef0453b25612dfa.mp3'
	let i=0;
	let rotateDeg
	audio.oncanplay = function(){
		audio.play()
		$('.disc-container').addClass('playing')
		$('.pointer').removeClass('leaveDisc')
	}	
	$('.icon-pause').on('click', function(){
		audio.pause()	
		$('.disc-container').removeClass('playing')
		$('.pointer').addClass('leaveDisc')
		
	})
	$('.icon-play').on('click', function(){
		audio.play()	
		$('.disc-container').addClass('playing')
	    $('.pointer').removeClass('leaveDisc')
	})
})
