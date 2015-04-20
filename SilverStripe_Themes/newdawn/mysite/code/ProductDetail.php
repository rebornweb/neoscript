<?php

class ProductDetail extends DataObject{

private static $db = array (

'Name' => 'varchar(30)',
 
'ItemID' => 'Varchar(30)', // ProductID
		'Model' => 'Varchar(30)',

		'CostPrice' => 'Currency', // Wholesale cost of the product to the merchant

		//physical properties
		'Weight' => 'Decimal(9,2)',
		'Height' => 'Decimal(9,2)',
		'Width' => 'Decimal(9,2)',
		'Depth' => 'Decimal(9,2)',

);

private static $has_one = array (

'Product' => 'Product',
'Photo' => 'Image'

);


  

public function getCMSFields() {
        $fields = FieldList::create(
	       TextField::create('Name'),
	       TextField::create('ItemID'),
	       TextField::create('CostPrice'),
	       TextField::create('Weight'),
	       TextField::create('Height'),
            $uploader = UploadField::create('Photo')
        );

        $uploader->setFolderName('assets');
        $uploader->getValidator()->setAllowedExtensions(array('png','gif','jpeg','jpg'));

        return $fields;
    }  
  
  


//This is to include Priceinfo.ss
   function getInfo() {
        return $this->renderWith('ProductInfo');
    }

}
