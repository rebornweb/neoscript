<?php

class ContactPage extends Page {


}

class ContactPage_Controller extends Page_Controller {
   private static $allowed_actions = array('Form');
    public function Form() {

	//Define Text Fields Make Contact Form
	  $fields = new FieldList(
             TextField::create('Name')->setTitle('Your Name'),
             EmailField::create('Email')->setTitle('Your Email'),
             TextareaField::create('Message')->setTitle('Write Us A Message')
        );
        $actions = new FieldList(
            new FormAction('submit', 'Submit')
        ); 

        //  Validate
$validator = new RequiredFields('Name', 'Message');
return new Form($this, 'Form', $fields, $actions, $validator); 
    }

	//Collect Data
    public function submit($data, $form) {
        $email = new Email();
        $email->setTo('andrei@rebornweb.co.nz');
        $email->setFrom($data['Email']);
        $email->setSubject("Contact Message from {$data["Name"]}");
        $messageBody = "
            <p><strong>Name:</strong> {$data['Name']}</p>
            <p><strong>Message:</strong> {$data['Message']}</p>
        ";
        $email->setBody($messageBody);
        $email->send();
        return array(
            'Content' => '<p>Thank you for your feedback.</p>',
            'Form' => ''
        );
    }

}
