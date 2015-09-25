<?php
 
 class HomePage extends Page{




//ProductDetails Relationship
private static $many_many = array(
        'Slideshows' => 'Slideshow'
    );

  

public function getCMSFields() {

     // Get the fields from the parent implementation
        $fields = parent::getCMSFields();   
        // Create a default configuration for the new GridField, allowing record editing
        $config = GridFieldConfig_RelationEditor::create();
        // Set the names and data for our gridfield columns
        $config->getComponentByType('GridFieldDataColumns')->setDisplayFields(array(
            'Name' => 'Name',
            'HomePage.Title'=> 'HomePage' // Retrieve from a has-one relationship so shows itself, Own PageName
        ));  
	  // Create a gridfield to hold the Slideshow relationship   
        $SlideshowsField = new GridField(
            'Slideshows', // Field name
            'Slideshow', // Field title
            $this->Slideshows(), // List of all related Slideshows
            $config
        );       
        // Create a tab named "Photos" and add our field to it
        $fields->addFieldToTab('Root.Slideshows', $SlideshowsField);

	
	

return $fields;


}



}//END of Page class 

class HomePage_controller extends Page_controller{

}
