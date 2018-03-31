$(document).ready(function(){
  // console.log('ready bitches');; // success
  $('#searchUser').on("keyup",function(e){
    let username = (e.target.value) // searches at every keystrokes


// making request using ajax to github

    $.ajax({    // using ajax
      url:'https://api.github.com/users/' + username,
      data:{      // data to feed id and secret for eleviated access
        client_id:'86e0b2f77fa85bfee478',
        client_secret:'1ce05880132c29643bf20d2f6fd8501ba6b558f9',
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/' + username +'/repos', // fetching repos
        data:{
          client_id:'86e0b2f77fa85bfee478',
          client_secret:'1ce05880132c29643bf20d2f6fd8501ba6b558f9',
          sort: 'updated', // for sorting
          per_page: 5,
        }
      }).done(function(repos){

       $.each(repos,function(index,repo){ // for each would

         $('#repos').append(`

           <div class="alert  alert-secondary">
              <div class="row">
                <div class="col-md-7">
                <h4 class="text-info">${repo.name}</h4><br>${repo.description}
                </div>

                <div class="col-md-3">
                <span class="badge badge-primary">Forks : ${repo.forks_count}</span>
                  <span class="badge badge-danger">Watchers : ${repo.watchers_count}</span>
                <span class="badge badge-success">Stars : ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                <a class="btn btn-primary btn-block" target="_blank" href="${repo.html_url}">Repo Page</a>
                </div>

              </div>
           </div>
           `)
       });
      });
    $('#profile').html(`

      <div class="card">
        <h5 class="card-header">${user.name}</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
              <img src="${user.avatar_url}" class="thumbnail image">
              <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">Profile</a>

              </div>
              <div class="col-md-9">
              <span class="badge badge-primary">Publuc Repos : ${user.public_repos}</span>
              <span class="badge badge-danger">Public Gists : ${user.public_gists}</span>
              <span class="badge badge-success">Followers : ${user.followers}</span>
              <span class="badge badge-info">Following : ${user.following}</span>
              <br>
              <br>
              <ul class="list-group">
                <li class="list-group-item">Username : ${user.login}</li>
                <li class="list-group-item">Company : ${user.company}</li>
                <li class="list-group-item">Website/blog : ${user.blog}</li>
                <li class="list-group-item">Location : ${user.location}</li>
                <li class="list-group-item">Bio : ${user.bio}</li>

              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>

      `);
    });

  });
});
