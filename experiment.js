  // LICENCE -----------------------------------------------------------------------------
  //
  // Copyright 2018 - Cédric Batailler
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this
  // software and associated documentation files (the "Software"), to deal in the Software
  // without restriction, including without limitation the rights to use, copy, modify,
  // merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  // permit persons to whom the Software is furnished to do so, subject to the following
  // conditions:
  //
  // The above copyright notice and this permission notice shall be included in all copies
  // or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  // INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  // PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  // HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  // CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  // OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  //
  // OVERVIEW -----------------------------------------------------------------------------
  //
  // TODO:
  //
  // safari exclusion ---------------------------------------------------------------------
  var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var is_ie = /*@cc_on!@*/false || !!document.documentMode;

  var is_compatible = !(is_safari || is_ie);


  if(!is_compatible) {


      var exclusion = {
          type: "html-keyboard-response",
          stimulus:
          "<p>Malheureusement, cette étude n'est pas compatible avec votre " +
          "navigateur.</p>" +
          "<p>Veuillez rouvrir cette expérience à partir d'un navigateur pris en charge (par exemple " +
          "Chrome ou Firefox).</p>",
          choices: jsPsych.NO_KEYS
      };

      var timeline_exclusion = [];

      timeline_exclusion.push(exclusion);
      jsPsych.init({timeline: timeline_safari});

  }
  // firebase initialization ---------------------------------------------------------------
  var firebase_config = {
    apiKey: "AIzaSyBwDr8n-RNCbBOk1lKIxw7AFgslXGcnQzM",
    databaseURL: "https://postdocgent.firebaseio.com/"
  };

  firebase.initializeApp(firebase_config);
  var database = firebase.database();
  var session_id  = jsPsych.randomization.randomID();

  // connection status ---------------------------------------------------------------------
  // This section ensure that we don't lose data. Anytime the 
  // client is disconnected, an alert appears onscreen
  var connectedRef = firebase.database().ref(".info/connected");
  var connection   = firebase.database().ref("connection/" + session_id + "/")
  var dialog = undefined;
  var first_connection = true;

  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      connection
        .push()
        .set({status: "connection",
              timestamp: firebase.database.ServerValue.TIMESTAMP})

      connection
        .push()
        .onDisconnect()
        .set({status: "disconnection",
              timestamp: firebase.database.ServerValue.TIMESTAMP})

    if(!first_connection) {
      dialog.modal('hide');
    }
    first_connection = false;
    } else {
      if(!first_connection) {
      dialog = bootbox.dialog({
          title: 'Connection lost',
          message: '<p><i class="fa fa-spin fa-spinner"></i> Veuillez patienter pendant que nous essayons de nous reconnecter.</p>',
          closeButton: false
          });
    }
    }
  });

// Global variables:
var approach_key  = "E";
var avoidance_key = "C";

// do something in the background
   // cursor helper functions -------------------------------------------------------------
  var hide_cursor = function() {
     document.querySelector('head').insertAdjacentHTML('beforeend', '<style id="cursor-toggle"> html { cursor: none; } </style>');
  }
  var show_cursor = function() {
     document.querySelector('#cursor-toggle').remove();
  }

  var hiding_cursor = {
      type: 'call-function',
      func: hide_cursor
  }

  var showing_cursor = {
      type: 'call-function',
      func: show_cursor
  }

  // Variable input -----------------------------------------------------------------------
  // Variable used to define experimental condition.
  var vaast_cond_block_1 = jsPsych.randomization.sampleWithoutReplacement(["approach_pos", "approach_neg"], 1)[0];

   if (vaast_cond_block_1 == "approach_pos") {
     vaast_cond_block_2 = "approach_neg";
   } else if (vaast_cond_block_1 == "approach_neg") {
     vaast_cond_block_2 = "approach_pos";
   } 

  // prolific variables
  //var prolific_id = jsPsych.data.getURLVariable('prolific_id');
  //if(prolific_id == null) {prolific_id = "999";}

  // counter variables
  var vaast_trial_n    = 1;
  var browser_events_n = 1;

    /* Functions */
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  };

  // VAAST --------------------------------------------------------------------------------
  // VAAST variables ----------------------------------------------------------------------
  var movement_pos_1 = undefined;
  var movement_neg_1 = undefined;
  var movement_pos_2 = undefined;
  var movement_neg_2 = undefined;

  var stim_to_approach_1 = undefined;
  var stim_to_approach_2 = undefined;
  var stim_to_avoid_1    = undefined;
  var stim_to_avoid_2    = undefined;

  switch(vaast_cond_block_1) {
    case "approach_pos":
      movement_pos_1 = "approach";
      movement_neg_1 = "avoidance";
      stim_to_approach_1 = "les mots <b>POSITIFS</b> liés à la sociabilité et à la moralité";
      stim_to_avoid_1 = "les mots <b>NEGATIFS</b> liés à la sociabilité et à la moralité";
      break;

    case "approach_neg":
      movement_pos_1 = "avoidance";
      movement_neg_1 = "approach";
      stim_to_approach_1 = "les mots <b>NEGATIFS</b> liés à la sociabilité et à la moralité";
      stim_to_avoid_1 = "les mots <b>POSITIFS</b> liés à la sociabilité et à la moralité";
      break;
  }

  switch(vaast_cond_block_2) {
    case "approach_pos":
      movement_pos_2 = "approach";
      movement_neg_2 = "avoidance";
      stim_to_approach_2 = "les mots <b>POSITIFS</b> liés à la sociabilité et à la moralité";
      stim_to_avoid_2 = "les mots <b>NEGATIFS</b> liés à la sociabilité et à la moralité";
      break;

    case "approach_neg":
      movement_pos_2 = "avoidance";
      movement_neg_2 = "approach";
      stim_to_approach_2 = "les mots <b>NEGATIFS</b> liés à la sociabilité et à la moralité";
      stim_to_avoid_2 = "les mots <b>POSITIFS</b> liés à la sociabilité et à la moralité";
      break;
  }


  // VAAST stimuli ------------------------------------------------------------------------
  
  // LIST FOR FIRST BLOCK
  var vaast_stim_block_1_soc_pos = [
    {stimulus: 'sociable',      category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'attentionné',   category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'chaleureux',    category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'sympathique',   category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'cordial',       category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'agréable',      category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'accueillant',   category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'plaisant',      category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'aimable',       category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'avenant',       category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'gentil',        category: "sociability_pos",  movement: movement_pos_1},
    {stimulus: 'accessible',    category: "sociability_pos",  movement: movement_pos_1},
  ];

var vaast_stim_block_1_soc_neg = [
    {stimulus: 'froid',         category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'hautain',       category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'désagréable',   category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'hostile',       category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'déplaisant',    category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'insensible',    category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'distant',       category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'pénible',       category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'mauvais',       category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'ennuyeux',      category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'agaçant',       category: "sociability_neg",  movement: movement_neg_1},
    {stimulus: 'réservé',       category: "sociability_neg",  movement: movement_neg_1},
  ];

  var vaast_stim_block_1_mor_pos = [
    {stimulus: 'honnête',       category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'moral',         category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'honorable',     category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'sincère',       category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'fiable',        category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'intègre',       category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'juste',         category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'loyal',         category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'fidèle',        category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'droit',         category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'respectable',   category: "morality_pos",  movement: movement_pos_1},
    {stimulus: 'vertueux',      category: "morality_pos",  movement: movement_pos_1},
  ];

  var vaast_stim_block_1_mor_neg = [
    {stimulus: 'malhonnête',    category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'déloyal',       category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'fourbe',        category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'perfide',       category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'corrompu',      category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'immoral',       category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'infidèle',      category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'sournois',      category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'faux',          category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'hypocrite',     category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'véreux',        category: "morality_neg",  movement: movement_neg_1},
    {stimulus: 'tricheur',      category: "morality_neg",  movement: movement_neg_1},
  ];

  // Stimuli for the Test phases
  // We merge the stimuli from the previous list 
  var vaast_stim_block_1 = vaast_stim_block_1_soc_pos.concat(vaast_stim_block_1_soc_neg).concat(vaast_stim_block_1_mor_pos).concat(vaast_stim_block_1_mor_neg)

  // Stimuli for the Training (before Test)
  // We randomly select 1 stimuli within each list
  var vaast_stim_block_1_soc_pos_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_1_soc_pos, 1);
  var vaast_stim_block_1_soc_neg_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_1_soc_neg, 1);
  var vaast_stim_block_1_mor_pos_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_1_mor_pos, 1);
  var vaast_stim_block_1_mor_neg_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_1_mor_neg, 1);

  // We create the list for training stimuli
  var vaast_stim_training_block_1 = vaast_stim_block_1_soc_pos_training.concat(vaast_stim_block_1_soc_neg_training).concat(vaast_stim_block_1_mor_pos_training).concat(vaast_stim_block_1_mor_neg_training)

 // LIST FOR SECOND BLOCK
  var vaast_stim_block_2_soc_pos = [
    {stimulus: 'sociable',      category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'attentionné',   category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'chaleureux',    category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'sympathique',   category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'cordial',       category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'agréable',      category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'accueillant',   category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'plaisant',      category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'aimable',       category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'avenant',       category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'gentil',        category: "sociability_pos",  movement: movement_pos_2},
    {stimulus: 'accessible',    category: "sociability_pos",  movement: movement_pos_2},
  ];

var vaast_stim_block_2_soc_neg = [
    {stimulus: 'froid',         category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'hautain',       category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'désagréable',   category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'hostile',       category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'déplaisant',    category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'insensible',    category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'distant',       category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'pénible',       category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'mauvais',       category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'ennuyeux',      category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'agaçant',       category: "sociability_neg",  movement: movement_neg_2},
    {stimulus: 'réservé',       category: "sociability_neg",  movement: movement_neg_2},
  ];

  var vaast_stim_block_2_mor_pos = [
    {stimulus: 'honnête',       category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'moral',         category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'honorable',     category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'sincère',       category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'fiable',        category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'intègre',       category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'juste',         category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'loyal',         category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'fidèle',        category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'droit',         category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'respectable',   category: "morality_pos",  movement: movement_pos_2},
    {stimulus: 'vertueux',      category: "morality_pos",  movement: movement_pos_2},
  ];

  var vaast_stim_block_2_mor_neg = [
    {stimulus: 'malhonnête',    category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'déloyal',       category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'fourbe',        category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'perfide',       category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'corrompu',      category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'immoral',       category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'infidèle',      category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'sournois',      category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'faux',          category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'hypocrite',     category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'véreux',        category: "morality_neg",  movement: movement_neg_2},
    {stimulus: 'tricheur',      category: "morality_neg",  movement: movement_neg_2},
  ];

  // Stimuli for the Test phases
  // We merge the stimuli from the previous list 
  var vaast_stim_block_2 = vaast_stim_block_2_soc_pos.concat(vaast_stim_block_2_soc_neg).concat(vaast_stim_block_2_mor_pos).concat(vaast_stim_block_2_mor_neg)

  // Stimuli for the Training (before Test)
  // We randomly select 1 stimuli within each list
  var vaast_stim_block_2_soc_pos_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_2_soc_pos, 1);
  var vaast_stim_block_2_soc_neg_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_2_soc_neg, 1);
  var vaast_stim_block_2_mor_pos_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_2_mor_pos, 1);
  var vaast_stim_block_2_mor_neg_training = jsPsych.randomization.sampleWithoutReplacement(vaast_stim_block_2_mor_neg, 1);

  // We create the list for training stimuli
  var vaast_stim_training_block_2 = vaast_stim_block_2_soc_pos_training.concat(vaast_stim_block_2_soc_neg_training).concat(vaast_stim_block_2_mor_pos_training).concat(vaast_stim_block_2_mor_neg_training)


  // vaast background images --------------------------------------------------------------

  var background = [
    "background/2.jpg",
    "background/4.jpg",
    "background/6.jpg"
  ];


  // vaast stimuli sizes -------------------------------------------------------------------

  var word_sizes = [
    38,
    46,
    60
  ];

  // Helper functions ---------------------------------------------------------------------
  // next_position():
  // Compute next position as function of current position and correct movement. Because
  // participant have to press the correct response key, it always shows the correct
  // position.
  var next_position = function(){
    var current_position = jsPsych.data.getLastTrialData().values()[0].position;
    var current_response = jsPsych.data.getLastTrialData().values()[0].key_press;
    var position = current_position;

    var approach_keycode  = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(approach_key);
    var avoidance_keycode = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(avoidance_key);

    if(current_response == approach_keycode) {
      position = position + 1;
    }

    if(current_response == avoidance_keycode) {
      position = position -1;
    }

    return(position)
  }
  // Saving blocks ------------------------------------------------------------------------
  // Every function here send the data to keen.io. Because data sent is different according
  // to trial type, there are differents function definition.

  // init ---------------------------------------------------------------------------------
  var saving_id = function(){
    database
        .ref("participant_id_AA_dim/")
        .push()
        .set({session_id: session_id,
          	   timestamp: firebase.database.ServerValue.TIMESTAMP,
               vaast_cond_block_1: vaast_cond_block_1,
               vaast_cond_block_2: vaast_cond_block_2})
  }

  // vaast trial --------------------------------------------------------------------------
  var saving_vaast_trial = function(){
  	database
  	  .ref("vaast_trial_AA_dim/").
      push()
        .set({session_id: session_id,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          vaast_cond_block_1: vaast_cond_block_1,
          vaast_cond_block_2: vaast_cond_block_2,
          vaast_trial_data: jsPsych.data.get().last(4).json()})
  }

  var saving_extra = function() {
  	database
  	 .ref("extra_info_AA_dim/")
     .push()
  	 .set({session_id: session_id,
         timestamp: firebase.database.ServerValue.TIMESTAMP,
         vaast_cond_block_1: vaast_cond_block_1,
         vaast_cond_block_2: vaast_cond_block_2,
         extra_data: jsPsych.data.get().last(7).json(),
        })
  }

  var saving_browser_events = function(completion) {
  	database
  	 .ref("browser_event_AA_dim/")
     .push()
  	 .set({session_id: session_id,
         timestamp: firebase.database.ServerValue.TIMESTAMP,
         vaast_cond_block_1: vaast_cond_block_1,
         vaast_cond_block_2: vaast_cond_block_2,
      completion: completion,
      event_data: jsPsych.data.getInteractionData().json()})
  }
  // saving blocks ------------------------------------------------------------------------
  var save_id = {
      type: 'call-function',
      func: saving_id
  }

  var save_vaast_trial = {
      type: 'call-function',
      func: saving_vaast_trial
  }

  var save_extra = {
      type: 'call-function',
      func: saving_extra
  }

  // iat sampling function ----------------------------------------------------------------
  var sample_n = function(list, n) {
    list = jsPsych.randomization.sampleWithReplacement(list, n);
    list = jsPsych.randomization.shuffleNoRepeats(list);

    return(list);
  }
  // EXPERIMENT ---------------------------------------------------------------------------




  // initial instructions -----------------------------------------------------------------
  /*
  var welcome = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'> Welcome </h1>" +
      "<p class='instructions'>Thank you for taking part in this study.<p>" +
      "<p class='instructions'>During this study, you will have to complete two different categorization tasks. We " +
      " will record your performance on these tasks but " +
      "we will not collect any personally identifying information.</p>" +
      "<p class='instructions'>Because we rely on third party services to gather data, ad-blocking " +
      "softwares might interfere with data collection. Therefore, please  " +
      "disable your ad-blocking software during this study. " +
      "<b>If we are unable to record your data, we will not be able to reward you for " +
      "your participation</b>. </p>" +
      "<p class='instructions'>If you have any question related to this research, please " +
      "e-mail me at marine.rougier@uclouvain.be.</p>" +
      "<p class = 'continue-instructions'>Press <strong>space</strong> to start the study.</p>",
    choices: [32]
  };
*/

  var consent = {
    type: "html-button-response",
    stimulus:
    "<h1 class ='custom-title'> Consentement éclairé </h1>" +
      "<p class='instructions'>Nous vous remercions chaleureusement de l'intérêt que vous portez à cette étude, "+
      "menée en collaboration par plusieurs chercheurs de l'UCLouvain. Sans vous, nous ne pourrions pas mener à bien nos études. "+
      "Avant de commencer, veuillez couper votre téléphone afin de pouvoir vous concentrer sur l'étude </p>" +
        "<p class='instructions'>Votre consentement éclairé est requis pour cette étude. La participation à cette recherche est volontaire "+
        "et ne comporte aucun risque pour vous (au-delà de ceux de la vie quitidienne). "+
      "L'objectif de cette étude est de mieux comprendre les processus de catégorisation. La durée de l'étude est de 10 minutes environ. </p>" +
      "<p class='instructions'>Toutes les données receuillies par cette étude sont confidentielles. Vos réponses resteront privées et nous "+
        "n'inclurons aucune information qui permettraient de vous identifier dans les rapports que nous pourrions publier. "+
      "En donnant votre consentement, vous nous autorisez à partager les données anonymisées de cette étude à d'autres scientifiques. "+
      "Aussi, veuillez ne pas include d'information qui pourrait vous identifier dans les questions ouvertes. </p>" +
      "<p class='instructions'>En cliquant sur le bouton \"Je confirme\", vous accordez votre consentement éclairé pour " +
      "participer à cette recherche.</p>",
    choices: ['Je confirme']
  }

  // Switching to fullscreen --------------------------------------------------------------
  var fullscreen_trial = {
    type: 'fullscreen',
    message:  '<p>Pour participer à cette étude, votre navigateur doit être réglé sur plein écran.</p>',
    button_label: 'Passer en plein écran',
    fullscreen_mode: true
  }

  // Initial instructions -----------------------------------------------------------------
  // First slide --------------------------------------------------------------------------
  var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>Vous êtes maintenant sur le point de commencer l'étude. "+
    "<br><br>"+
    "Dans cette étude, vous allez effectuer une tâche de catégorisation appelée la 'tâche du jeu vidéo'. " +
    "<br>Cette tâche est divisée en deux blocs.</p>" +
    "<p><b>Votre tâche sera de catégoriser des mots positifs et négatifs liés "+
    "à la sociabilité et à la moralité.</b> "+
    "Aussi, <br>veuillez prendre quelques instants pour regarder à quelle categorie appartient chaque mot : </p>" +
    "<table>" +
      "<tr>" +
        "<th width='200px'><p font:80> <br><br></p></th>" +
        "<th align='center'><p font:80>Mots positifs<br><br></p></th>" +
        "<th align='center'><p font:80>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspMots négatifs<br><br></p></th>" +
      "</tr>" +
      "<br>" +
      "<tr>" +
        "<td><b>Mots reliés à <br>la sociabilité :</b></td>" +
        "<td align='center'>sociable, attentionné, chaleureux, sympathique, cordial, agréable, accueillant, plaisant, aimable, avenant, gentil, accessible</td>"+
        "<td align='center'>froid, hautain, désagréable, hostile, déplaisant, insensible, distant, pénible, mauvais, ennuyeux, agaçant, réservé</td>"+
      "</tr>" +
      "<tr>" +
        "<td><br><b>Mots reliés à<br> la moralité :</b></td>" +        
        "<td align='center'>honnête, moral, honorable, sincère, fiable, intègre, juste, loyal, fidèle, droit, respectable, vertueux</td>"+
        "<td align='center'>malhonnête, déloyal, fourbe, perfide, corrompu, immoral, infidèle, sournois, faux, hypocrite, véreux, tricheur</td>"+
      "</tr>" +
    "</table>" +
    "<br>" +
    "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  // VAAST instructions -------------------------------------------------------------------

  var vaast_instructions_1 = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Tâche du jeu vidéo</h1>" +
      "<p class='instructions'>Dans cette tâche, comme dans un jeu vidéo, vous vous trouverez dans un environnement virtuel " +
      "(présenté ci-dessous) dans lequel vous pourrez avancer ou reculer.</p>" +
      "<p class='instructions'><center>" +
        "<img src = 'media/vaast-background.png'>" +
      "</center></p>" +
      "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  var vaast_instructions_2 = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Tâche du jeu vidéo</h1>" +
      "<p class='instructions'>Des mots faisant référence à la sociabilité ou à la moralité apparaîtront dans cet environnement. Votre tâche " +
      "sera d'avancer ou de reculer en fonction du type de mot (des instructions plus spécifiques vont suivre).</p>" +
      "<p class='instructions'> Pour avancer ou reculer, vous utiliserez les touches suivantes " +
      "de votre clavier:</p>" +
      "<p class='instructions'><center>" +
        "<img src = 'media/keyboard-vaastt.png'>" +
      "</center></p>" +
      "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  var vaast_instructions_3 = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Tâche du jeu vidéo</h1>" +
      "<p class='instructions'>Au début de chaque essai, vous verrez le symbole 'O'. Ce symbole " +
      "indique que vous devez appuyer sur la touche <b>DEPART</b> (la touche <b>D</b> du clavier) pour démarrer l'essai.</p>" +
      "<p class='instructions'>Ensuite, vous verrez une croix de fixation (+) au centre de l'écran, suivie " +
      "d'un mot.</p>" +
      "<p class='instructions'>Votre tâche sera d'avancer ou de reculer en appuyant sur la touche <b>'avancer'</b> " +
      "(la touche <b>E</b> du clavier) ou sur la touche <b>'reculer'</b> (la touche <b>C</b> du clavier) <strong>aussi rapidement que possible</strong>.</p>" +
      "<p class='instructions'>Pour toutes ces actions, veuillez utiliser uniquement l'index de votre main dominante.</p>" +
      "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  var vaast_instructions_training_block_1 = {
      type : "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Tâche du jeu vidéo: Bloc 1/2</h1>" +
        "<p class='instructions'><center><strong>INSTRUCTIONS POUR CE PREMIER BLOC</strong></center></p>" +
        "<p class='instructions'>Dans ce bloc, vous devez :</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROCHER " + stim_to_approach_1 + " en appuyant sur la touche 'avancer' (la touche " + approach_key + ")</strong></li>" +
          "<li><strong>EVITER " + stim_to_avoid_1 + " en appuyant sur la touche 'reculer' (la touche " + avoidance_key + ")</strong></li>" +
         "</ul>" +
        "<p class='instructions'>Vous allez maintenant commencer par une phase d'entraînement.</p>" +
        "<p class='instructions'><u>ATTENTION :</u> nous signalerons vos erreurs UNIQUEMENT pendant la phase d'entrainement, donc " +
        "il est important que vous lisiez attentivement et mémorisiez les instructions ci-dessus.</p>" +
        "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
      choices: [32]
  };

  var vaast_instructions_test_block_1 = {
      type: "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Tâche du jeu vidéo: Bloc 1/2</h1>" +
        "<p class='instructions'>La phase d'entrainement est maintenant terminée.</p>" +
        "<p class='instructions'><u>ATTENTION :</u> vous n'aurez plus de message pour signaler vos erreurs.</p>" +
        "<p class='instructions'>Pour rappel, vous devez :</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROCHER " + stim_to_approach_1 + " en appuyant sur la touche 'avancer' (la touche " + approach_key + ")</strong></li>" +
          "<li><strong>EVITER " + stim_to_avoid_1 + " en appuyant sur la touche 'reculer' (la touche " + avoidance_key + ")</strong></li>" +
         "</ul>" +
        "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  var vaast_instructions_training_block_2 = {
      type : "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Tâche du jeu vidéo: Bloc 2/2</h1>" +
        "<p class='instructions'><center><strong>INSTRUCTIONS POUR CE DEUXIEME BLOC</strong></center></p>" +
        "<p class='instructions'>Dans ce bloc, vous devez :</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROCHER " + stim_to_approach_2 + " en appuyant sur la touche 'avancer' (la touche " + approach_key + ")</strong></li>" +
          "<li><strong>EVITER " + stim_to_avoid_2 + " en appuyant sur la touche 'reculer' (la touche " + avoidance_key + ")</strong></li>" +
         "</ul>" +
        "<p class='instructions'>Vous allez maintenant commencer par une phase d'entraînement.</p>" +
        "<p class='instructions'><u>ATTENTION :</u> nous signalerons vos erreurs UNIQUEMENT pendant la phase d'entrainement, donc " +
        "il est important que vous lisiez attentivement et mémorisiez les instructions ci-dessus.</p>" +
        "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
      choices: [32]
  };

  var vaast_instructions_test_block_2 = {
      type: "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Tâche du jeu vidéo: Bloc 2/2</h1>" +
        "<p class='instructions'>La phase d'entrainement est maintenant terminée.</p>" +
        "<p class='instructions'><u>ATTENTION :</u> vous n'aurez plus de message pour signaler vos erreurs.</p>" +
        "<p class='instructions'>Pour rappel, vous devez :</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROCHER " + stim_to_approach_2 + " en appuyant sur la touche 'avancer' (la touche " + approach_key + ")</strong></li>" +
          "<li><strong>EVITER " + stim_to_avoid_2 + " en appuyant sur la touche 'reculer' (la touche " + avoidance_key + ")</strong></li>" +
         "</ul>" +
        "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };


  var vaast_instructions_4 = {
    type: "html-keyboard-response",
    stimulus:
      "<p class='instructions'><center>Avant de commencer :</center></p>" +
      "<p class='instructions'>Rappelez-vous qu'il est EXTRÊMEMENT IMPORTANT que vous essayiez de " +
      "répondre aussi rapidement et aussi correctement que possible.</p>" +
      "<br>" +
      "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  }

  var vaast_instructions_5 = {
    type: "html-keyboard-response",
    stimulus:
      "<p class='instructions'><center><strong>Fin de ce bloc. </strong></center></p>" +
      "<br>" +
      "<p class = 'continue-instructions'><center>Appuyez sur <strong>espace</strong> pour continuer.</center></p>",
    choices: [32]
  };


  // Creating a trial ---------------------------------------------------------------------

  var vaast_start = {
    type: 'vaast-text',
    stimulus: "o",
    position: 1,
    background_images: background,
    font_sizes:  word_sizes,
    approach_key: "d",
    stim_movement: "approach",
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: true,
    display_feedback: true,
    response_ends_trial: true
  }

  var vaast_fixation = {
    type: 'vaast-fixation',
    fixation: "+",
    font_size: 46,
    position: 1,
    background_images: background
  }

  var vaast_first_step_train_1 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: true,
    feedback_duration: 500, 
    response_ends_trial: true
  }

  var vaast_first_step_1 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: false,
    response_ends_trial: true
  }

  var vaast_second_step_1 = {
    type: 'vaast-text',
    position: next_position,
    stimulus: jsPsych.timelineVariable('stimulus'),
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    response_ends_trial: false,
    trial_duration: 500
  }

  var vaast_second_train_1 = {
    chunk_type: "if",
    timeline: [vaast_second_step_1],
    conditional_function: function(){
      var data = jsPsych.data.getLastTrialData().values()[0];
      return data.correct;
    }
  }

  var vaast_first_step_train_2 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: true,
    feedback_duration: 500, 
    response_ends_trial: true
  }

  var vaast_first_step_2 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: false,
    response_ends_trial: true
  }

  var vaast_second_step_2 = {
    type: 'vaast-text',
    position: next_position,
    stimulus: jsPsych.timelineVariable('stimulus'),
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    response_ends_trial: false,
    trial_duration: 500
  }

  var vaast_second_train_2 = {
    chunk_type: "if",
    timeline: [vaast_second_step_2],
    conditional_function: function(){
      var data = jsPsych.data.getLastTrialData().values()[0];
      return data.correct;
    }
  }

  var vaast_first_step_train_3 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: true,
    feedback_duration: 500, 
    response_ends_trial: true
  }

  var vaast_first_step_3 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: false,
    response_ends_trial: true
  }

  var vaast_second_step_3 = {
    type: 'vaast-text',
    position: next_position,
    stimulus: jsPsych.timelineVariable('stimulus'),
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    response_ends_trial: false,
    trial_duration: 500
  }

  var vaast_second_train_3 = {
    chunk_type: "if",
    timeline: [vaast_second_step_3],
    conditional_function: function(){
      var data = jsPsych.data.getLastTrialData().values()[0];
      return data.correct;
    }
  }

  var vaast_first_step_train_4 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: true,
    feedback_duration: 500, 
    response_ends_trial: true
  }

  var vaast_first_step_4 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: false,
    response_ends_trial: true
  }

  var vaast_second_step_4 = {
    type: 'vaast-text',
    position: next_position,
    stimulus: jsPsych.timelineVariable('stimulus'),
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    response_ends_trial: false,
    trial_duration: 500
  }

  var vaast_second_train_4 = {
    chunk_type: "if",
    timeline: [vaast_second_step_4],
    conditional_function: function(){
      var data = jsPsych.data.getLastTrialData().values()[0];
      return data.correct;
    }
  }

  // VAAST blocks ---------------------------------------------------------------------

  var vaast_training_block_1 = {
    timeline: [vaast_start, vaast_fixation, vaast_first_step_train_1, vaast_second_train_1, save_vaast_trial],
    timeline_variables: vaast_stim_training_block_1,
    repetitions: 2,
    randomize_order: true
  };

  var vaast_test_block_1 = {
    timeline: [vaast_start, vaast_fixation, vaast_first_step_1, vaast_second_step_1, save_vaast_trial],
    timeline_variables: vaast_stim_block_1,
    repetitions: 1,
    randomize_order: true
  };
  
  var vaast_training_block_2 = {
    timeline: [vaast_start, vaast_fixation, vaast_first_step_train_2, vaast_second_train_2, save_vaast_trial],
    timeline_variables: vaast_stim_training_block_2,
    repetitions: 2,
    randomize_order: true
  };

  var vaast_test_block_2 = {
    timeline: [vaast_start, vaast_fixation, vaast_first_step_2, vaast_second_step_2, save_vaast_trial],
    timeline_variables: vaast_stim_block_2,
    repetitions: 1,
    randomize_order: true
  };

  
  // end fullscreen -----------------------------------------------------------------------

  var fullscreen_trial_exit = {
    type: 'fullscreen',
    fullscreen_mode: false
  }

  // demographics + questions -------------------------------------------------------------

  var extra_information = {
    type: 'html-keyboard-response',
    stimulus:
      "<p class='instructions'>L'étude est presque terminée. Maintenant, vous devez répondre à quelques questions.</p>" +
      "<p class='continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  var extra_information_2 = {
    timeline: [{
      type: 'survey-text',
      questions: [{prompt: "Merci d'indiquer votre âge :"}],
      button_label: "OK",
    }],
    loop_function: function(data) {
      var extra_information_2 = data.values()[0].responses;
      var extra_information_2 = JSON.parse(extra_information_2).Q0;
      if (extra_information_2 == "") {
        alert("Veuillez répondre !");
        return true;
      }
    },
    on_finish: function(data) {
      jsPsych.data.addProperties({
        extra_information_2: JSON.parse(data.responses)["Q0"],
      });
    }
  }

  var extra_information_3 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "Quel est votre genre ?", options: ["&nbspHomme", "&nbspFemme", "&nbspAutre"], required: true, horizontal: true}],
    button_label: "OK"
  }

  var extra_information_4 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "Quel est votre niveau de français ?",
                 options: ["&nbspLangue maternelle", "&nbspTrès bon", "&nbspBon", "&nbspMoyen", "&nbspMauvais", "&nbspTrès mauvais"],
                 required: true, horizontal: false}],
    button_label: "OK"
  }

  var extra_information_5 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "En quelle année d'étude êtes-vous?",
                 options: ["&nbspBachelier 1", "&nbspBachelier 2", "&nbspBachelier 3", "&nbspMaster 1", "&nbspMaster 2"],
                 required: true, horizontal: false}],
    button_label: "OK"
  }

  var extra_information_6 = {
    type: 'survey-text',
    questions: [{prompt: "Avez-vous des remarques sur cette étude ? [Optionnel]"}],
    button_label: "OK"
  }

  // end insctruction ---------------------------------------------------------------------

  var ending = {
    type: "html-keyboard-response",
    stimulus:
      "<p class='instructions'>Vous avez maintenant terminé l'étude.<p>" +
      "<p class='instructions'>Nous allons maintenant vous donner un peu plus d'information sur le but de l'étude. " +
      "Cette étude avait pour but de mesurer vos tendances comportementales d'approche et d'évitement envers les mots " +
      "qui étaient présentés à l'écran. Notre hypothèse est que les individus sont généralement plus rapides pour approcher "+
      "des mots positifs et pour éviter des mots négatifs plutôt que pour faire l'inverse (approcher des mots négatifs et éviter "+
      "des mots positifs). Par ailleurs, nous voulons voir si cet effet varie en fonction du type de mot utilisé, à savoir "+
      "si le mot renvoie à de la sociabilité ou à de la moralité. </p>" +
      "<p class='instructions'>Pour plus d'information, n'hésitez pas à me contacter par email : " +
      "julien.barbedor@uclouvain.be</p>" +
      "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
    choices: [32]
  };

  // procedure ----------------------------------------------------------------------------
  // Initialize timeline ------------------------------------------------------------------
  var timeline = [];

  timeline.push(consent);

  // prolific verification
  timeline.push(save_id);

  // fullscreen
  timeline.push(fullscreen_trial,
                hiding_cursor);
/*
  // initial instructions
  timeline.push(instructions);

  // vaast - instructions
  timeline.push(vaast_instructions_1,
                vaast_instructions_2,
                vaast_instructions_3);

 // vaast - blocks
  timeline.push(vaast_instructions_training_block_1,
                vaast_instructions_4,
                vaast_training_block_1,
                vaast_instructions_test_block_1,
                vaast_test_block_1,
                vaast_instructions_5,
                vaast_instructions_training_block_2,
                vaast_instructions_4,
                vaast_training_block_2,
                vaast_instructions_test_block_2,
                vaast_test_block_2);

  // vaast - end
  timeline.push(fullscreen_trial_exit,
                showing_cursor);

 // demographic questions
  timeline.push(extra_information,
                extra_information_2,
                extra_information_3,
                extra_information_4,
                extra_information_5,
                extra_information_6,
                save_extra);
*/
  // ending
  timeline.push(ending);

  // Launch experiment --------------------------------------------------------------------
  // preloading ---------------------------------------------------------------------------
  // Preloading. For some reason, it appears auto-preloading fails, so using it manually.
  // In principle, it should have ended when participants starts VAAST procedure (which)
  // contains most of the image that have to be pre-loaded.
  var loading_gif               = ["media/loading.gif"]
  var vaast_instructions_images = ["media/vaast-background.png", "media/keyboard-vaastt.png"];
  var vaast_bg_filename         = background;

  jsPsych.pluginAPI.preloadImages(loading_gif);
  jsPsych.pluginAPI.preloadImages(vaast_instructions_images);
  jsPsych.pluginAPI.preloadImages(vaast_bg_filename);

  // timeline initiaization ---------------------------------------------------------------

  if(is_compatible) {
    jsPsych.init({
        timeline: timeline,
        on_interaction_data_update: function() {
          saving_browser_events(completion = false);
        },
      on_finish: function() {
          saving_browser_events(completion = true);
          window.location.href = "https://uclpsychology.co1.qualtrics.com/jfe/form/SV_8ieU2dQ0h4ZVitM?session_id=" + session_id;
      }
    });
  }
