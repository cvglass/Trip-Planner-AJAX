function reducer(state, action) {
  // WRONG strtegy
  // 1. change the state
  // 2. return the state

  // RIGHT way
  // 1. copy the old state
  // 2. change the copy
  // 3. return the copy
  const nextState = Object.assign({}, state);
  if(action.type === 'SET_CURRENT_DAY') {
    nextState.currentDay = action.currentDay;
  }

  else if(action.type === 'ADD_HOTEL') {
    nextState.hotels = Object.assign(nextState.hotels);
    nextState.hotels[action.hotel.id] = action.hotel;
  }

  else if(action.type === 'ADD_RESTAURANT') {
    nextState.restaurants = Object.assign(nextState.restaurants);
    nextState.restaurants[action.restaurant.id] = action.restaurant;
  }

  else if(action.type === 'ADD_ACTIVITY') {
    nextState.activities = Object.assign(nextState.activities);
    nextState.activities[action.activity.id] = action.activity;
  }

  else if(action.type === 'ADD_DAY') {
    nextState.days = nextState.days.concat([action.day]);
  }

  else if(action.type === 'ADD_ATTRACTION_TO_DAY') {
    nextState.days = nextState.days
      .map((day, i) => {
        if(i !== nextState.currentDay) {
          return day;
        }
        const nextCurrentDay = Object.assign({}, day);
        nextCurrentDay[action.attractionType] = nextCurrentDay[action.attractionType]
          .concat([action.attractionId]);

        return nextCurrentDay;
      });
  }



  return nextState;
}

const appStore = new Store({
  hotels: {},
  restaurants: {},
  activities: {},
  days: [],
  currentDay: null,
}, reducer);

function addDay() {
  $.ajax({
    type: 'POST',
    url: '/api/days',
    data: {
      dayNumber: appStore.getState().days.length + 1
    }
  })
  .then(function(){
      appStore.dispatch({
      type: 'ADD_DAY',
      day: {
        hotels: [], //array of objects
        restaurants: [],
        activities: []
      }
    });
  })

}

//add ajax put request to day
function addAttractionToDay(type, attractionId) {
  console.log('GOT TO ADD ATTRACTION TO DAY');
  $.ajax({
    type: 'PUT',
    url: `/api/days/${appStore.state.currentDay + 1}/${type}`,
    data: {type: type,
      attractionId: attractionId}
  })
    .then(() => {
      appStore.dispatch({
      type: 'ADD_ATTRACTION_TO_DAY',
      attractionType: type,
      attractionId
    });
  });
}

function setCurrentDay(i) {
  return {
    type: 'SET_CURRENT_DAY',
    currentDay: i
  };
}

$.get('/api/hotels')
  .then((hotels)=>{
    hotels.forEach(hotel =>
      appStore.dispatch({
        type: 'ADD_HOTEL',
        hotel
      })
    );
  });

$.get('/api/restaurants')
  .then((restaurants)=>{
    restaurants.forEach(restaurant =>
      appStore.dispatch({
        type: 'ADD_RESTAURANT',
        restaurant
      })
    );
  });

$.get('/api/activities')
  .then((activities)=>{
    activities.forEach(activity =>
      appStore.dispatch({
        type: 'ADD_ACTIVITY',
        activity
      })
    );
  });

  $.get('/api/days')
    .then((days) => {
      days.forEach(dayObj =>
        appStore.dispatch({
          type: 'ADD_DAY',
          day: {
            hotels: [], //get hotel obj
            restaurants: [],
            activities: []
          }
        })
      );
    })
    .then(() => {
      appStore.dispatch(setCurrentDay(0));
    });
