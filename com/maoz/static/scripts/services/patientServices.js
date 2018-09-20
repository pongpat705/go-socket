
angular.module('app').factory('patientServices',
		['$http', '$filter', '$rootScope',
		 function patientServices
		 ($http, $filter,$rootScope) {
    return { 
	  genericGet : function(link, page, size){
	  	  return $http.get(link, {params:{'page':page, 'size':size}});
	  },
	  genericPatch : function(generic,link){
    	  return $http.patch(link,generic);
      },
      genericDel : function(id){
    	  return $http.delete(id);
      },
	  getPatients: function(page, size){
          return $http.get(CONTEXT+'/api/ipePatientProfiles',{params:{'page':page, 'size':size}});
      },
      getPatientByRole : function(role, page, size){
    	  return $http.get(CONTEXT+'/api/users/search/findByRole',{params:{'role':role, 'page':page, 'size':size}});
      },
      getPatientByIndexName : function(indexName){
    	  return $http.get(CONTEXT+'/api/ipePatientProfiles/search/findByIndexName',{params:{'indexName':indexName}});
      },
      addNewPatients: function(patients){
    	  return $http.post(CONTEXT+'/api/ipePatientProfiles',patients);
      },
      patchPatientParent : function(patient,link){
    	  return $http.patch(link,patient, {headers:{'Content-Type': 'text/uri-list'}});
      },
      addVisitLog : function(visit){
    	  return $http.post(CONTEXT+'/api/ipeVisitLogs',visit);
      },
      patientDeleteVisits : function(patientId, visitId){
    	  return $http.delete(CONTEXT+'/api/ipePatientProfiles/'+patientId+'/visits/'+visitId);
      },
      addFamilyMember : function(member){
    	  return $http.post(CONTEXT+'/api/ipeFamilyMembers',member);
      },
      patientDeleteMembers : function(patientId, memberId){
    	  return $http.delete(CONTEXT+'/api/ipePatientProfiles/'+patientId+'/members/'+memberId);
      },
      addUseDrug : function(drug){
    	  return $http.post(CONTEXT+'/api/ipeUseDrugs',drug);
      },
      addDrugList : function(drugList){
    	  return $http.post(CONTEXT+'/api/ipeDrugLists',drugList);
      },
      drugDeleteList : function(drugId, listId){
    	  return $http.delete(CONTEXT+'/api/ipeUseDrugs/'+drugId+'/drugList/'+listId);
      },
      patchDrugParent : function(drugList,link){
    	  return $http.patch(link,drugList, {headers:{'Content-Type': 'text/uri-list'}});
      },
      patientDeleteDrug : function(patientId, drugId){
    	  return $http.delete(CONTEXT+'/api/ipePatientProfiles/'+patientId+'/useDrugs/'+drugId);
      },
      addPatientTransaction : function(txn){
    	  return $http.post(CONTEXT+'/api/ipePatientTransactions',txn);
      },
      findByCreatedDate : function(createdDate, indexName){
    	  return $http.get(CONTEXT+'/api/ipePatientTransactions/search/findByCreatedDate',{params:{'createdDate':createdDate, 'indexName': indexName}})
      },
      uploadFile : function(file, txn, user){
    	  var fd = new FormData();
          fd.append('file', file);
          return $http(
        		  {	url: CONTEXT+'/service/uploadImage/'+txn.transactionId+'/'+user,
        			method: 'POST',
        			data: fd,
        			headers: { 'Content-Type': undefined},
        			transformRequest: angular.identity
        		  });
      },
      addLab : function(lab){
    	  return $http.post(CONTEXT+'/api/ipeMedicalTechnicals',lab);
      },
      transactionDeleteLab : function(transactionId, labId){
    	  return $http.delete(CONTEXT+'/api/ipePatientTransactions/'+transactionId+'/medical/'+labId);
      },
      getPatienTransactions : function(profileId, page, size){
    	  return $http.get(CONTEXT+'/api/ipePatientTransactions/search/findByPatientId',{params:{'profileId': profileId, 'page':page, 'size':size}});
      },
      addEstimate : function(estimate){
    	  return $http.post(CONTEXT+'/api/ipeStudentEstimates',estimate);
      },
      getEstimateByUserId : function(userId){
    	  return $http.get(CONTEXT+'/api/ipeStudentEstimates/search/findByUserId',{params:{'userId': userId}});
      },
      patientDeleteLab : function(patienId, labId){
    	  return $http.delete(CONTEXT+'/api/ipePatientProfiles/'+patienId+'/medical/'+labId);
      },
      getPatientPtByStudentId : function(studentId){
    	  return $http.get(CONTEXT+'/api/ipePatientPtStudents/search/findByStudentId',{params:{'studentId': studentId}});
      },
      addPatientPt: function(patientPt){
    	  return $http.post(CONTEXT+'/api/ipePatientPtStudents',patientPt);
      },
      genericPutUrl : function(object, link){
    	  return $http.put(link,object, {headers:{'Content-Type': 'text/uri-list'}});
      },
      addExamination :function(examinat){
    	  return $http.post(CONTEXT+'/api/ipePatientExaminations',examinat);
      },
      ptDeleteExamination : function(ptId, examinatId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPtStudents/'+ptId+'/examinations/'+examinatId);
      },
      addConclude :function(conclude){
    	  return $http.post(CONTEXT+'/api/ipeConcludeAnalyses',conclude);
      },
      ptDeleteConclude : function(ptId, concludeId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPtStudents/'+ptId+'/concludeAnalysis/'+concludeId);
      },
      addGoal :function(goal){
    	  return $http.post(CONTEXT+'/api/ipeGoalPlans',goal);
      },
      ptDeleteGoal : function(ptId, goalId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPtStudents/'+ptId+'/goals/'+goalId);
      },
      addNote :function(note){
    	  return $http.post(CONTEXT+'/api/ipeProgressNotes',note);
      },
      ptDeleteNote : function(ptId, noteId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPtStudents/'+ptId+'/notes/'+noteId);
      },
      ptUploadFile : function(file, pt, user){
    	  var fd = new FormData();
          fd.append('file', file);
          return $http(
        		  {	url: CONTEXT+'/service/pt/uploadImage/'+pt.ptId+'/'+user,
        			method: 'POST',
        			data: fd,
        			headers: { 'Content-Type': undefined},
        			transformRequest: angular.identity
        		  });
      },
      getPatientPhByStudentId : function(studentId){
    	  return $http.get(CONTEXT+'/api/ipePatientPhStudents/search/findByStudentId',{params:{'studentId': studentId}});
      },
      addPatientPh: function(patientPh){
    	  return $http.post(CONTEXT+'/api/ipePatientPhStudents',patientPh);
      },
      addCompliance :function(compliance){
    	  return $http.post(CONTEXT+'/api/ipePhCompliances',compliance);
      },
      phDeleteCompliance : function(phId, complianceId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPhStudents/'+phId+'/compliances/'+complianceId);
      },
      addDrp :function(drp){
    	  return $http.post(CONTEXT+'/api/ipeDrpReports',drp);
      },
      phDeleteDrp : function(phId, drpId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPhStudents/'+phId+'/drpReports/'+drpId);
      },
      addReconcil :function(reconcil){
    	  return $http.post(CONTEXT+'/api/ipeMedReconcils',reconcil);
      },
      phDeleteReconcil : function(phId, medId){
    	  return $http.delete(CONTEXT+'/api/ipePatientPhStudents/'+phId+'/reconcils/'+medId);
      },
      getPtByPatientId : function(ptId){
    	  return $http.get(CONTEXT+'/api/ipePatientPtStudents/search/getByPatient',{params:{'patient': ptId}});
      },
      getPhByPatientId : function(phId){
    	  return $http.get(CONTEXT+'/api/ipePatientPhStudents/search/getByPatient',{params:{'patient': phId}});
      },
      mapUploadFile : function(file, patient, user){
    	  var fd = new FormData();
          fd.append('file', file);
          return $http(
        		  {	url: CONTEXT+'/service/map/uploadImage/'+patient.patientId+'/'+user,
        			method: 'POST',
        			data: fd,
        			headers: { 'Content-Type': undefined},
        			transformRequest: angular.identity
        		  });
      },
      ecoMapUploadFile : function(file, patient, user){
    	  var fd = new FormData();
          fd.append('file', file);
          return $http(
        		  {	url: CONTEXT+'/service/eco/uploadImage/'+patient.patientId+'/'+user,
        			method: 'POST',
        			data: fd,
        			headers: { 'Content-Type': undefined},
        			transformRequest: angular.identity
        		  });
      },
      genoMapUploadFile : function(file, patient, user){
    	  var fd = new FormData();
          fd.append('file', file);
          return $http(
        		  {	url: CONTEXT+'/service/geno/uploadImage/'+patient.patientId+'/'+user,
        			method: 'POST',
        			data: fd,
        			headers: { 'Content-Type': undefined},
        			transformRequest: angular.identity
        		  });
      },
      addFurther : function(further){
    	  return $http.post(CONTEXT+'/api/ipePatientProfileFurthers',further);
      },
      patientDeleteFurther : function(patienId, furtherId){
    	  return $http.delete(CONTEXT+'/api/ipePatientProfiles/'+patienId+'/furthers/'+furtherId);
      }
    };
  }]);