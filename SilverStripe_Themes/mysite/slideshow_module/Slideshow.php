<?php

class Slideshow extends DataObject{

private static $db = array (

'Name' => 'Varchar(50)',
'Description' => 'Varchar(1000)', 


);

private static $has_one = array (

'PhotoPage' => 'PhotoPage',
'HomePage' => 'HomePage',
'Photo' => 'Image',


);


  



public function getCMSFields() {
        $fields = FieldList::create(
	       TextField::create('Name'),
		   TextareaField::create('Description'),
	    
            $uploader = UploadField::create('Photo')

        );

        $uploader->setFolderName('assets');
        $uploader->getValidator()->setAllowedExtensions(array('png','gif','jpeg','jpg'));
		

        return $fields;
    }  
  
  




}


