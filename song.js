$(function(){
	$.get('./lyric.json').then(function(object){
		//console.log(object)
		let {lyric} = object // 等同于lyric = object.lyric
		let array = lyric.split('\n')
		//console.log(array)
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string, index){
			let matches = string.match(regex)	
		//	console.log(matches)
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
	setInterval(()=>{
	let seconds = audio.currentTime
	let minutes = ~~(seconds/60)
	let left = seconds - minutes*60
	let time = `${pad(minutes)}:${pad(left)}`
	//console.log(time)
        let $lines = $('.lines>p')
	let $whichLine
		//console.log($lines)
	for(let i=0; i<$lines.length; i++){
	  if($lines[i+1]!==undefined&&$lines.eq(i).attr('data-time')<time&&$lines.eq(i+1).attr('data-time')>time){
	  $whichLine = $lines.eq(i)
          break}
	}
	  if($whichLine){
             $whichLine.addClass('active').prev().removeClass('active')

	     let top = $whichLine.offset().top
             let linesTop = $('.lines').offset().top
	     let delta = top - linesTop - $('.lyric').height()/3
	     $('.lines').css('transform',`translateY(-${delta}px)`)
	  
	  
	  }	
	}
		,300)

	function pad(number){
	return number>=10 ? number + '': '0'+number
	}
})
