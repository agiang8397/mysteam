const content = document.querySelector('#content');
const input = document.querySelector('#input')
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const getAllGames = async () => {
    try {
        const res = await fetch("https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?limit=50", requestOptions);
        const datagames = await res.json();
        return datagames.data;
    } catch (error) {
        console.log(error);
    }
}

const  renderAllGames = async () => {
    try {
        const games = await getAllGames();
        games.forEach( game => {
            const getDetail = async () => {
                try {
                    const res = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${game.appid}`, 
                    requestOptions);
                    const datagames = await res.json();
                    return datagames.data;
                } catch (error) {
                    console.log(error);
                }
            }
            const box = document.createElement('div');
            box.className = 'box-game';
            box.addEventListener('click', async () => {
                const datas = await getDetail();
                console.log(datas);                    
                
                content.innerHTML=`<img src="${game['header_image']}" id='img-detail' alt=""><p id='descript'>${datas.description}</p>
                                    <p class='para'>Price: $${datas.price}</p>
                                    <p class='para'>Developer: ${datas.developer}</p>`;

            })
            box.innerHTML = `<div class="div-img">
                <img src="${game['header_image']}" alt="">
                </div>
                <div class="div-text">
                    <p>${game.name}</p>
                    <p>$${game.price}</p>
                </div>`;
            content.appendChild(box);
        })
    } catch (error) {
        console.log(error);
    }
}  
renderAllGames();
const renderGenresGames = async (genre) => {
    try {
        const allGames = await getAllGames();
        const genresGames = allGames.filter(allGame => {
            return allGame.genres.includes(genre) === true;
        })
        content.innerHTML="";
        genresGames.forEach(game => {
            const getDetail = async () => {
                try {
                    const res = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${game.appid}`, 
                    requestOptions);
                    const datagames = await res.json();
                    return datagames.data;
                } catch (error) {
                    console.log(error);
                }
            }
            const box = document.createElement('div');
            box.className = 'box-game';
            box.addEventListener('click', async () => {
                const datas = await getDetail();
                console.log(datas);                    
                
                content.innerHTML=`<img src="${game['header_image']}" id='img-detail' alt=""><p id='descript'>${datas.description}</p>
                <p class='para'>Price: $${datas.price}</p>
                <p class='para'>Developer: ${datas.developer}</p>`;

            })
            box.innerHTML = `<div class="div-img">
            <img src="${game['header_image']}" alt="">
        </div>
        <div class="div-text">
            <p>${game.name}</p>
            <p>$${game.price}</p>
        </div>`;
        content.appendChild(box);
        })       
    } catch (error) {
        console.log(error)
    }
}
const getSearchGames = async () => {
    try {
        const res = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?limit=50&q=${input.value}`, requestOptions);
        const datagames = await res.json();
        return datagames.data;
        
    } catch (error) {
        console.log(error);
    }
}

const  renderSearchGames = async () => {
    try {
        content.innerHTML='';
        const games = await getSearchGames();
        games.forEach(game => {
            const getDetail = async () => {
                try {
                    const res = await fetch(`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${game.appid}`, 
                    requestOptions);
                    const datagames = await res.json();
                    return datagames.data;
                } catch (error) {
                    console.log(error);
                }
            }
            const box = document.createElement('div');
            box.className = 'box-game';
            box.addEventListener('click', async () => {
                const datas = await getDetail();
                console.log(datas);                    
                
                content.innerHTML=`<img src="${game['header_image']}" id='img-detail' alt=""><p id='descript'>${datas.description}</p>
                <p class='para'>Price: $${datas.price}</p>
                <p class='para'>Developer: ${datas.developer}</p>`;

            })
           
            box.innerHTML = `<div class="div-img">
            <img src="${game['header_image']}" alt="">
            </div>
            <div class="div-text">
            <p>${game.name}</p>
            <p>$${game.price}</p>
        </div>`;
        content.appendChild(box);
        })
        
    } catch (error) {
        console.log(error);
    }
}


