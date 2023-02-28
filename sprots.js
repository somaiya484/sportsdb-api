const searchAllData = () =>{
    const inputElement = document.getElementById('search-value');
    document.getElementById("single-player-details").innerHTML = "";
    document.getElementById("male").classList.add("d-none");
    document.getElementById("female").classList.add("d-none");

    const inputValue = inputElement.value;
    // console.log(inputValue)

    const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`
    console.log(URL)
    fetch(URL)
    .then(res => res.json())
    .then(data => showPlayerData(data.player))
}

const showPlayerData = (players) =>{
    document.getElementById('search-value').value = " ";

    console.log(players)
    const container = document.getElementById('player-info');
    container.innerHTML = ' ';
    players.forEach((player) => {
        console.log(player);
        const {strThumb, strPlayer, strNationality, idPlayer} = player

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${strThumb ? strThumb :  "https://picsum.photos/500/300?random=3"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${strPlayer}</h5>
                    <p class="card-text">Nationality: ${strNationality}</p>
                </div>
                <div class="my-3">
                <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-info ms-3">Details</button>
                <button type="button" class="btn btn-danger ms-3">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(div)
    });
};

const singlePlayer = (id) =>{
    // console.log(id)
    const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => showSinglePLayer(data.players[0]));
}

const showSinglePLayer = (data) =>{
    const {strThumb, strPlayer, strBirthLocation, strWeight, strDescriptionEN, strInstagram, strGender} = data;
    const container = document.getElementById('single-player-details');
    const div = document.createElement('div');
    if(strGender === "Male"){
        const element = document.getElementById("male");
        element.classList.remove("d-none");
    } else{
        const element2 = document.getElementById("female");
        element2.classList.remove("d-none");
    }
    div.innerHTML=`
    <div class="card mb-3 w-100 h-100 mt-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${strPlayer}</h5>
                    <p class="card-title">${strBirthLocation}</p>
                    <p class="card-title">Weight: ${strWeight}</p>
                    <p class="card-text">${strDescriptionEN.slice(0,100) + ".... "
                    }</p>
                    <p class="card-text"><small class="text-muted">Instagram: strInstagram:${strInstagram}</small></p>
                </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(div)
}

