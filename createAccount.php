<?php
include_once('integration/init.php');
$countryId = $_POST['countryId'];
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name']; 
$email = $_POST['email'];
$phoneAreaCode = $_POST['countryId'];
$phoneCountryCode = $_POST['country-code'];
$phoneNumber = $_POST['phone-number'];

$leadAccountRegistrationRequest = new LeadAccountRegistrationRequest();
$leadAccountRegistrationRequest->CountryId = $countryId;
$leadAccountRegistrationRequest->FirstName = $firstName;
$leadAccountRegistrationRequest->LastName = $lastName;
$leadAccountRegistrationRequest->Email = $email;
$leadAccountRegistrationRequest->PhoneAreaCode = $phoneAreaCode;
$leadAccountRegistrationRequest->PhoneCountryCode = $phoneCountryCode;
$leadAccountRegistrationRequest->PhoneNumber = $phoneNumber;

$leadAccountRegistrationRequest->AdditionalInfo = new DynamicAttributeInfo();
$leadAccountRegistrationRequest->EnvironmentInfo = new EnvironmentInfo();
$leadAccountRegistrationRequest->MarketingInfo = new MarketingInfo();

$registerLeadAccount = new RegisterLeadAccount();

$registerLeadAccount->ownerUserId = $config['ownerUserId'];
$registerLeadAccount->organizationName = $config['organization'];
$registerLeadAccount->businessUnitName = $config['businessUnitName'];
$registerLeadAccount->leadAccountRegistrationRequest = $leadAccountRegistrationRequest;

$leverateCrm = getCrm($config);

$registerLeadAccountResponse = $leverateCrm->RegisterLeadAccount($registerLeadAccount);
if ($registerAccountResponse->RegisterAccountResult->Result->Code != 'Success') {
    return false;
}
return $registerAccountResponse->RegisterAccountResult->AccountId; 