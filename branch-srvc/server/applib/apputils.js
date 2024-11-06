/**
* apputils.js
*
*/


/**
 * Проверяет, что переменная на undefined и не null
 * если OK возвразает true, если не сложилось - false
 * @param {any} p_value любая переменная
 * @returns {boolean} l_result результат проверки переменной 
 */
function isDefined(p_value) {
	let l_result = true ;
	if (typeof p_value === "undefined"){
		l_result=false;
	} else if ( p_value === null){
		l_result=false;
	} else {
		// do nothing
	};
	return l_result ;     
}

/**
 * 
 * @param {Object} err обьект ошибки
 * 
 * @return {string} err_message сообщение об ошибке
 *  
 */
function formatError( err ){
	var err_message='' ;
	
	if( err.hasOwnProperty('response')){
		if (err.hasOwnProperty('err.response.data.ErrorResponse.description')) {
			err_message =  err.message	+ '[' + err.response.data.ErrorResponse.description + '] (' + err.stack + ')';
		} else {
			err_message =  err.message	+ '[' + ' . ' + '] (' + err.stack + ')';
		}	
	} else {
		err_message = '[' + err.message + '] (' + err.stack + ')'; 
	}

	return err_message ;
}

module.exports.isDefined = isDefined;
module.exports.formatError = formatError;