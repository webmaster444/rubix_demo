import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col, Form, FormGroup, Button, ControlLabel, FormControl, Checkbox} from '@sketchpixy/rubix';

import settings from '../settings.js';
import Panelunit from '../common/PanelUnit';
import Datatable from './Datatablesjs.js';


export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.setTableObj = this.setTableObj.bind(this);
		this.setDetailData = this.setDetailData.bind(this);
		this.renderSearchResult = this.renderSearchResult.bind(this);
		this.search = this.search.bind(this);
		this.state={
			tableObj: null,
			tableData: null,
			detailData: {},
            date_start:0,
            date_stop:0
		}
	}
	setTableObj(obj){
		this.setState({ tableObj: obj});
	}
	setDetailData(data){
		this.setState({ detailData: data});
	}
	componentDidMount() {
		Messenger.options = { theme: 'flat' };
		this.datepickerInit();
		this.centerPanelHeight();
	}
	centerPanelHeight(){
		if(window.innerWidth > 1151){
			$('#hometable_wrapper').css('height', window.innerHeight-210);
		}
		else{
			$('#hometable_wrapper').css('height', 'inherit');
		}
		window.onresize=function(){
			if(window.innerWidth > 1151){
				$('#hometable_wrapper').css('height', window.innerHeight-210);
			}
			else{
				$('#hometable_wrapper').css('height', 'inherit');
			}
		}
	}
	datepickerInit(){
        var that=this;
		// $("#start_date").flatpickr();
		$('#datepicker_start').datetimepicker({
			showClose: true,
            useCurrent:false,
            defaultDate:moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0)
		});
		$('#datepicker_end').datetimepicker({
			showClose: true,
			useCurrent: false,
            defaultDate:moment(new Date()).hours(23).minutes(59).seconds(59)
		});
		$("#datepicker_start").on("dp.change", function (e) {
            that.state.date_start++;
			$('#datepicker_end').data("DateTimePicker").minDate(e.date);
            setTimeout(function() {
                    simulate(document.getElementById("btn_starttime"), "click");
            }, 100);

		});
		$("#datepicker_end").on("dp.change", function (e) {
            that.state.date_stop++;
			$('#datepicker_start').data("DateTimePicker").maxDate(e.date);
            
            setTimeout(function() {
                    simulate(document.getElementById("btn_stoptime"), "click");
            }, 100);
		});
		$(".home_left").parent().css('overflow', 'visible');
	}
	renderSearchResult(data){
		this.setState({tableData: data});
		this.state.tableObj.fnClearTable();
		this.state.tableObj.fnAddData(data);
		this.state.tableObj.fnDraw();
		this.state.tableObj.api().responsive.recalc();
		//checkbox select when column click
		const checkboxCols = this.state.tableObj.api()
					.rows()
					.nodes()
					.to$()      // Convert to a jQuery object
					.find('input[type="checkbox"]').parent();
		checkboxCols.click(function(e){
			if (e.target !== this) return;
			$(this).find('input[type=checkbox]').trigger('click');
		});
	}
	search(e){
		e.preventDefault();
		var self = this;
		var start_val = $('input[name=start_time]').val();
		var stop_val = $('input[name=stop_time]').val();
		if (start_val == "" || stop_val == "") {
			Messenger({
				extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left'
			}).post({
				id: 'error',
				type: 'error',
				singleton: false,
				showCloseButton: true,
				message: 'Please input start time and stop time!'
			});
			return false;
		}
		var start_time = new Date(start_val).getTime();
		var stop_time = new Date(stop_val).getTime();

		var form = new FormData();
		form.append("start_time", start_time);
		form.append("stop_time", stop_time);
		form.append("auth_token", "uTDfRK4WPtpchbr3mHsIsftXmBlw6VWVakHvPiIGWoc=");
		form.append("security_context", "imda-stee-vpp");

		$.loader.open({imgUrl: '../imgs/loader/loading32x32.gif'});

		$.ajax({
			"method": "POST",
			"crossDomain": true,
			"dataType": 'json',
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"url": settings.apiBase+"/api/v1/search",
			"data": form
		})
		.done(function (response) {
			if(response[0].message == "no items"){
				Messenger({
					extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left'
				}).post({
					type: 'error',
					singleton: false,
					showCloseButton: true,
					message: "No search Result"
				});
				$.loader.close();
				return false;
			}
			self.renderSearchResult(response);
			$.loader.close();
		})
		.fail(function( jqXHR, textStatus ) {
			$.loader.close();
			Messenger({
				extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left'
			}).post({
				type: 'error',
				singleton: false,
				showCloseButton: true,
				message: "Request failed: " + textStatus
			});
		});
	}
	render() {
		return (
			<div className="home_main">
				<Col md={2}>
					<Panelunit title="Form" >
						<div className="home_left">
							{/*<input type='text' id='start_date' />*/}
							<FormGroup>
								<ControlLabel>Start Date</ControlLabel>
								<div className='input-group date' id='datepicker_start'>
									<input type='text' className="form-control" name='start_time'/>
									<span className="input-group-addon">
											<span className="glyphicon glyphicon-calendar" id='btn_starttime'></span>
									</span>
								</div>
							</FormGroup>
							<FormGroup>
								<ControlLabel>End Date</ControlLabel>
								<div className='input-group date' id='datepicker_end'>
									<input type='text' className="form-control" name='stop_time'/>
									<span className="input-group-addon">
										<span className="glyphicon glyphicon-calendar" id='btn_stoptime'></span>
									</span>
								</div>
							</FormGroup>
							<FormGroup>
								<Button  onClick={this.search}>
									Search
								</Button>
							</FormGroup>
						</div>
					</Panelunit>
				</Col>
				<Col md={7}>
					<Panelunit title="Search Result">
						<div className="home_center">
							<Datatable 
								tableData={this.state.tableData}
								tableObj={this.state.tableObj}
								setTableObj={this.setTableObj}
								setDetailData={this.setDetailData}
							/>
						</div>
					</Panelunit>
				</Col>
				<Col md={3}>
					<Panelunit title="Details">
						<div className="home_right">
							<FormGroup>
								<ControlLabel>File Name:</ControlLabel>
								<FormControl.Static>
									{this.state.detailData.file_name}
								</FormControl.Static>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Origin Name:</ControlLabel>
								<FormControl.Static>
									{this.state.detailData.original_file_name}
								</FormControl.Static>
							</FormGroup>
							<FormGroup>
								<ControlLabel>File Size(bytes):</ControlLabel>
								<FormControl.Static>
									{this.state.detailData.file_size}
								</FormControl.Static>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Tags:</ControlLabel>
								<FormControl.Static>
									{this.state.detailData.tags}
								</FormControl.Static>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Uploader ID:</ControlLabel>
								<FormControl.Static>
									{this.state.detailData.uploader_id}
								</FormControl.Static>
							</FormGroup>
							<FormGroup>
								<ControlLabel>Upload timestamp:</ControlLabel>
								<FormControl.Static>
									{this.state.detailData.uploaded_timestamp}
								</FormControl.Static>
							</FormGroup>
						</div>
					</Panelunit>
				</Col>
			</div>
		);
	}
}

