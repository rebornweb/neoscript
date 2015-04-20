<?php
 
 class Product extends Page{




//ProductDetails Relationship
private static $many_many = array(
        'ProductDetails' => 'ProductDetail'
    );

  

public function getCMSFields() {

     // Get the fields from the parent implementation
        $fields = parent::getCMSFields();   
        // Create a default configuration for the new GridField, allowing record editing
        $config = GridFieldConfig_RelationEditor::create();
        // Set the names and data for our gridfield columns
        $config->getComponentByType('GridFieldDataColumns')->setDisplayFields(array(
            'Name' => 'Name',
            'Product.Title'=> 'Product' // Retrieve from a has-one relationship
        ));  
	  // Create a gridfield to hold the ProductDetail relationship   
        $productdetailsField = new GridField(
            'ProductDetails', // Field name
            'ProductDetail', // Field title
            $this->ProductDetails(), // List of all related products
            $config
        );       
        // Create a tab named "Students" and add our field to it
        $fields->addFieldToTab('Root.ProductDetails', $productdetailsField);

	
	



   



	
	
	return $fields;


}

}//END of Page class 

class Product_controller extends Page_controller{

}
