var Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        strList: React.PropTypes.arrayOf(String),
    },

    btnReset: function() {
//        this.setState( (prevState, props) => { return {cnt:prevState.cnt+1}; } );
        console.log("btnReset")
    },

    chbSort: function() {
        console.log("chbSort")
    },

    inpChange: function(EO) {
        var strStart = EO.target.value;
        console.log("inpChange " + strStart);
        //     this.setState( (prevState, props) => { return {cnt:prevState.cnt+1}; } );
        // v.startsWith(EO.target.value)?v:""
        // this.props.strList.map(v => "1")
        // var newArr = this.props.strList.filter(v => v.startsWith(strStart));
        this.setState( (prevState, props) => { 
            return {strList: this.props.strList.push("123")}; 
        } );
    },

    render: function() {
        console.log("render");

        var list = this.props.strList.map( v => React.DOM.div({key:v,className:'List'}, React.DOM.span({className:'Text'},v),));
        
        return React.DOM.div( {className:'Filter'}, 
        React.DOM.input({type:'checkbox',name:'isSort',onClick:this.chbSort}),
        React.DOM.input({type:'text',name:'filtertext',onChange:this.inpChange}),
        React.DOM.input({type:'button',value:'Сброс',onClick:this.btnReset}),
        list,
        );
    },
});