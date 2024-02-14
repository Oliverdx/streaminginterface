function renderTvShow(id){

        var getShow = new XMLHttpRequest();
        getShow.open('GET', `/getshow?id=${id}`, true);
        getShow.onload = function(){
            var promise = new Promise(function(){
                let response = JSON.parse(getShow.responseText);
                let data = JSON.parse(response);
    
                setShowData( data[0]);
                setEpisodes( data[1]);
            }).then(AfterLoad());
        };

       getShow.send(null);
}

function setShowData(data){
    let background = document.getElementById('tvshow-body');
    let title = document.getElementById('showTitle');

    background.style.backgroundImage = `url('${data.Images.Background}')`;
    title.innerHTML = data.Title;

    insertGenre(data.Genres);
    insertYear(data.Year);
    insertSynopsis(data.Synopsis);
    insertCast(data.Cast);

}

function insertYear(year){
    if( year != ""){ //If the show have a year append the year, if not remove the / between genre and year
        document.querySelector('.show-desc .year').innerHTML = "/ " + year;
    }else{
        document.querySelector('.show-desc .separator').remove();
    }
}

function insertSynopsis(data){
    var synopsisWrapper = `<p>${data}</p>`;
    document.querySelector('.tvshow-footer .synopsis').insertAdjacentHTML('beforeend', synopsisWrapper);
}

function insertGenre(genre){
    genre.forEach(function(e){
        var episodegenre = `<span>${e.Title}</span>`;
        document.querySelector('.show-desc .genre').insertAdjacentHTML('beforeend', episodegenre);
    });
}

function insertCast(cast){

    cast.forEach(function(e){
        var link = e.Name;
        link = link.replace(" ", "+").toLowerCase();
        var castlink = `<a href="https://www.imdb.com/find?ref_=nv_sr_fn&q=${link}" target="_blank" rel="opener">${e.Name}</a>`;
        document.querySelector('.tvshow-footer .cast-tab').insertAdjacentHTML('beforeend', castlink);
    })

}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}


function removeClass(elem, elementClass){
    elem.removeAttribute('class', elementClass);
}

function addClass(elem, elementClass){
    elem.setAttribute('class', elementClass);
}


/* Episode List */

function setEpisodes(episodes){
    
    var seasonqtd = 0;
    episodes.forEach(function(ep){
        if(ep !== null ){
            if( parseInt(ep.SeasonNumber) > seasonqtd ){
                var season = new Promise(function(){
                    createSeason(ep.SeasonNumber);
                    seasonqtd++;
                }).then(createEpisode(ep));
                
            }else{
                createEpisode(ep);
            }
        }
    });
}

function createSeason(season){

    /* Create index tab to the season */

	if(season == "1"){
        var seasonbtn = `<span class="active" data-target="t${season}">T${season}</span>`;
        var seasonwrapper = `<section id="t${season}" class="tab-single active" data-identifier="t${season}"></section>`;
	}else{
        var seasonbtn = `<span data-target="t${season}">T${season}</span>`;
        var seasonwrapper = `<section id="t${season}" class="tab-single" data-identifier="t${season}"></section>`;
    }

    document.getElementById('season-tab').insertAdjacentHTML('beforeend',seasonbtn);
    document.getElementById('episodeslist').insertAdjacentHTML('beforeend', seasonwrapper);
}


function createEpisode(episode){
    var playbutton = `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 1.77 1.77" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M.66.62v.57c0 .02.02.04.04.04h.02l.49-.29c.02 0 .02-.02.02-.03 0-.02 0-.03-.02-.04L.72.58C.72.57.71.57.7.57.68.57.66.59.66.62zM.88 0c.49 0 .89.4.89.88 0 .49-.4.89-.89.89A.89.89 0 0 1 0 .88C0 .4.4 0 .88 0zm0 .09c.44 0 .8.36.8.79 0 .44-.36.8-.8.8a.8.8 0 0 1-.79-.8C.09.45.45.09.88.09z" fill="#d8d8d8"/></svg>`;
    document.getElementById("t" + episode.SeasonNumber).insertAdjacentHTML('beforeend', 
    `<div id="${episode.ID}" >
    <section class="ep-title">
    <h3>${episode.EpisodeNumber} ${episode.Title}</h3>
    <a href="#${episode.ID}" class="playepisode">${playbutton}</a>
    </section>
    <section class="epdesc">
    <div class="videothumb" style="background-image: url('${episode.Image}')"></div>
    <p class="synopsis">${episode.Synopsis}</p>
    </section>`);
    
} 

function AfterLoad(){

    var ep = document.querySelectorAll('.ep-title h3');
    ep.forEach(function(el){
        el.addEventListener("click", function(){
            if( el.parentNode.parentNode.classList.contains('showdesc')){
                el.parentElement.parentElement.classList.remove('showdesc');
            }else{
                el.parentElement.parentElement.classList.add('showdesc');
                var siblings = getSiblings(el.parentElement.parentElement);
                siblings.forEach(function(e){                  
                    if( e.classList.contains('showdesc') ){
                        e.classList.remove('showdesc');
                    }
                })
            } 
        });
    });

    var ep = document.querySelectorAll('.ep-title .playepisode');
    ep.forEach(function(el){
        el.addEventListener("click", function(){
            var ep = document.querySelectorAll('.ep-title .playepisode');
            var epURL = ep[1].href;
            epURL = epURL.replace(location.origin + '/#', '');
            alert("Play Episode");
        })
    })

    var tabindex = document.querySelectorAll('.tabs-index span');
    tabindex.forEach(tabs);

    function tabs(elem){
        elem.addEventListener("click", function(){
            var target = elem.attributes["data-target"].value;
            var scope = elem.parentNode.attributes["data-tabs-scope"].value;
            var activeTab = document.querySelector(`.tabs-content[data-tabs-scope=${scope}] .tab-single[data-identifier="${target}"]`);
            changeTab(elem);            
            changeTab(activeTab);
        }, false);
    }

    /* Share Buttons */

    var generalbuttons = document.querySelectorAll('.buttons a');
    generalbuttons.forEach(function(e){
        e.addEventListener("click", function(){
            switch(e.classList[0]){
                case 'share':
                    alert('Compartilhar Episódio');
                break;
                case 'record':
                    alert('Gravando Episódio');
                break;
                case 'rate':
                    alert('Classificar Episódio');
                break;
                case 'addlist':
                    alert('Episodio adicionado a lista');
                break;
            }
        });
    });

    setTimeout(function(){
        document.querySelector('.loading').remove();
        var app = document.querySelector('.app-wrapper');
        fadeIn(app);

    }, 1000);
}

function changeTab(tab){
    tab.classList.add('active');
    var siblingSingleTab = getSiblings(tab)
    siblingSingleTab.forEach(function(e){
        e.classList.remove('active');
    }); 
}

function getSiblings(el){
    return Array.prototype.filter.call(el.parentNode.children, function(child){ return child !== el; });
}


/* Initial Animation */

function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}