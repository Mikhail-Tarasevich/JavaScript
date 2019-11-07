var Good = React.createClass({

  displayName: 'Good',

  propTypes: {
    startWorkMode: React.PropTypes.number.isRequired,
    deffreeanswertext: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return { 
      selectedAnswerCode: null,
      freeanswertext:this.props.deffreeanswertext,
      workMode:this.props.startWorkMode,
    };
  },

  render: function() {

    return React.DOM.div( {className:'VotesBlock'}, 
      React.createElement(VotesQuestion, {question:this.props.question} ),
      React.DOM.div( {className:'Answers'}, answersCode ),
      ((this.state.workMode==1)&&this.state.selectedAnswerCode)
        ?React.DOM.input( {type:'button',value:'проголосовать',onClick:this.vote} )
        :null
    );

  },

});