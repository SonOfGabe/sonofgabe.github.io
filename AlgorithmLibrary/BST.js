// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY David Galles ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco


// Constants.

BST.LINK_COLOR = "#007700";
BST.HIGHLIGHT_CIRCLE_COLOR = "#007700";
BST.FOREGROUND_COLOR = "#007700";
BST.BACKGROUND_COLOR = "#EEFFEE";
BST.PRINT_COLOR = BST.FOREGROUND_COLOR;

BST.WIDTH_DELTA  = 50;
BST.HEIGHT_DELTA = 50;
BST.STARTING_Y = 50;


BST.FIRST_PRINT_POS_X  = 50;
BST.PRINT_VERTICAL_GAP  = 20;
BST.PRINT_HORIZONTAL_GAP = 50;



function BST(am, w, h)
{
	this.init(am, w, h);
}
function sleep(milliseconds) {
	var t = (new Date()).getTime();
	var i = 0;
	while (((new Date()).getTime() - t) < milliseconds) {
		i++;
	}
}
BST.prototype = new Algorithm();
BST.prototype.constructor = BST;
BST.superclass = Algorithm.prototype;

BST.prototype.init = function(am, w, h)
{
	var sc = BST.superclass;
	this.startingX =  w / 2;
	this.first_print_pos_y  = h - 2 * BST.PRINT_VERTICAL_GAP;
	this.print_max  = w - 10;

	var fn = sc.init;
	fn.call(this,am);
	this.addControls();
	this.nextIndex = 0;
	this.commands = [];
	this.cmd("CreateLabel", 0, "", 20, 10, 0);
	this.nextIndex = 1;
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}

BST.prototype.addControls =  function()
{
	this.insertField = addControlToAlgorithmBar("Text", "", "insertInput form-control topContorl", "input");
	this.insertField.onkeydown = this.returnSubmit(this.insertField,  this.insertCallback.bind(this), 4);
	this.insertButton = addControlToAlgorithmBar1("Button", "Вставить элемент", "Insert btn btn-primary topContorl", "input");
	this.insertButton.onclick = this.insertCallback.bind(this);
	this.deleteField = addControlToAlgorithmBar("Text", "", "DeleteInput form-control topContorl", "delete");
	this.deleteField.onkeydown = this.returnSubmit(this.deleteField,  this.deleteCallback.bind(this), 4);
	this.deleteButton = addControlToAlgorithmBar1("Button", "Удалить элемент", "Delete btn btn-primary topContorl", "delete");
	this.deleteButton.onclick = this.deleteCallback.bind(this);
	this.findField = addControlToAlgorithmBar("Text", "", "FindInput form-control topContorl", "find");
	this.findField.onkeydown = this.returnSubmit(this.findField,  this.findCallback.bind(this), 4);
	this.findButton = addControlToAlgorithmBar1("Button", "Искать элемент", "Find btn btn-primary topContorl", "find");
	this.findButton.onclick = this.findCallback.bind(this);
	this.printButton = addControlToAlgorithmBar("Button", "Распечатать дерево", "Print btn btn-primary topContorl");
	this.printButton.onclick = this.printCallback.bind(this);
	this.printRandButton = addControlToAlgorithmBar("Button", "Вывести случайное дерево", "PrintRandTree btn btn-primary topContorl test12");
	this.printRandButton.onclick = this.printRandCallback.bind(this)
	this.deleteTreeButton = addControlToAlgorithmBar("Button", "Удалить дерево", "DeleteTree btn btn-primary topContorl");
	this.deleteTreeButton.onclick = this.deleteTreeCallback.bind(this)
}

BST.prototype.reset = function()
{
	this.nextIndex = 1;
	this.treeRoot = null;
}

BST.prototype.insertCallback = function(event)
{
	var insertedValue = this.insertField.value;
	// Get text value
	insertedValue = this.normalizeNumber(insertedValue, 4);
	if (insertedValue != "")
	{
		// set text value
		this.insertField.value = "";
		this.implementAction(this.insertElement1.bind(this), insertedValue);
	}
}

BST.prototype.deleteCallback = function(event)
{
	var deletedValue = this.deleteField.value;
	if (deletedValue != "")
	{
		deletedValue = this.normalizeNumber(deletedValue, 4);
		this.deleteField.value = "";
		this.implementAction(this.deleteElement.bind(this),deletedValue);		
	}
}

BST.prototype.printRandCallback = function(event)
{
	this.implementAction(this.printRandTree.bind(this),"");						
}

BST.prototype.deleteTreeCallback = function(event)
{
	this.implementAction(this.deleteTree.bind(this),"");						
}

BST.prototype.printCallback = function(event)
{
	let log = document.getElementById('textblock')
	log.innerText = ""
	this.implementAction(this.printTree.bind(this),"");						
}

BST.prototype.printRandTree = async function(unused)  //TODO Сделать асинхронным
{
	this.deleteTree()

	let max = 15
	let a = []
	var index = 1
	for (let i = 0; i < max; i++) {
		a.push(Math.floor(Math.random() * 100))
	}
	a.forEach(element => {
		setTimeout(() => {
			this.implementAction(this.insertElement1.bind(this), element);
			this.animationManager.skipForward();

		}, 1000*index);
		index++;
	});
	// for (let item of a) {
	// 	this.insertElement1(item)
	// }

	window.console.log(this)
	
}








BST.prototype.deleteTree = function(unused)
{
	this.animationManager.resetAll()

	this.nextIndex = 1;
	this.treeRoot = null;
	this.commands = [];
	this.cmd("CreateLabel", 0, "", BST.EXPLANITORY_TEXT_X, BST.EXPLANITORY_TEXT_Y, 0);
	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	window.console.log(this)

}

BST.prototype.printTree = function(unused)
{
	let log = document.getElementById('textblock')
	$('#infocode').css('width', '360px');
	$('#test232').addClass("rotateclass")
	window.console.log(log)


	this.commands = [];
	
	if (this.treeRoot != null)
	{
		this.highlightID = this.nextIndex++;
		var firstLabel = this.nextIndex;
		this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, this.treeRoot.x, this.treeRoot.y);
		this.xPosOfNextLabel = BST.FIRST_PRINT_POS_X;
		this.yPosOfNextLabel = this.first_print_pos_y;
		this.printTreeRec(this.treeRoot);
		this.cmd("Delete",  this.highlightID);
		this.cmd("Step")
		
		for (var i = firstLabel; i < this.nextIndex; i++)
		{
			this.cmd("Delete", i);
		}
		this.nextIndex = this.highlightID;  /// Reuse objects.  Not necessary.
	}
	return this.commands;
}

BST.prototype.printTreeRec = function(tree)
{
	let log = document.getElementById('textblock')
	this.cmd("Step");
	if (tree.left != null)
	{
		this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
		this.printTreeRec(tree.left);
		this.cmd("Move", this.highlightID, tree.x, tree.y);				
		this.cmd("Step");
	}
	var nextLabelID = this.nextIndex++;
	window.console.log(tree.data)
	log.innerText += tree.data + "\n ";

	this.cmd("CreateLabel", nextLabelID, tree.data, tree.x, tree.y);
	this.cmd("SetForegroundColor", nextLabelID, BST.PRINT_COLOR);
	this.cmd("Move", nextLabelID, this.xPosOfNextLabel, this.yPosOfNextLabel);
	this.cmd("Step");
	
	this.xPosOfNextLabel +=  BST.PRINT_HORIZONTAL_GAP;
	if (this.xPosOfNextLabel > this.print_max)
	{
		this.xPosOfNextLabel = BST.FIRST_PRINT_POS_X;
		this.yPosOfNextLabel += BST.PRINT_VERTICAL_GAP;
		
	}
	if (tree.right != null)
	{
		this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
		this.printTreeRec(tree.right);
		this.cmd("Move", this.highlightID, tree.x, tree.y);	
		this.cmd("Step");
	}
	return;
}

BST.prototype.findCallback = function(event)
{
	var findValue;
	findValue = this.normalizeNumber(this.findField.value, 4);
	this.findField.value = "";
	this.implementAction(this.findElement.bind(this),findValue);						
}

BST.prototype.findElement = function(findValue)
{
	let log = document.getElementById('textblock')
	log.innerText = ""
	this.commands = [];
	
	this.highlightID = this.nextIndex++;
	log.innerText += "Ищем "+findValue + '\n'+ '\n'

	this.doFind(this.treeRoot, findValue);
	
	
	return this.commands;
}


BST.prototype.doFind = function(tree, value)
{
	let log = document.getElementById('textblock')
	$('#infocode').css('width', '360px');
	$('#test232').addClass("rotateclass")
	window.console.log(log)
	
	this.cmd("SetText", 0, "Searching for "+value);
	if (tree != null)
	{
		this.cmd("SetHighlight", tree.graphicID, 1);
		if (tree.data == value)
		{
			this.cmd("SetText", 0, "Searching for "+value+" : " + value + " = " + value + " (Element found!)");
			log.innerText += "Искомое значение "+value + " == " + tree.data + '\n' + "Элемент найден\n"
			this.cmd("Step");					
			this.cmd("SetText", 0, "Found:"+value);
			this.cmd("SetHighlight", tree.graphicID, 0);
		}
		else
		{
			if (tree.data > value)
			{
				this.cmd("SetText", 0, "Searching for "+value+" : " + value + " < " + tree.data + " (look to left subtree)");
				log.innerText +=  value + " < " + tree.data + '\n' + "Идем в лево\n\n"

				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				if (tree.left!= null)
				{
					this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
					this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
					this.cmd("Step");
					this.cmd("Delete", this.highlightID);
				}
				this.doFind(tree.left, value);
			}
			else
			{
				this.cmd("SetText", 0, "Searching for "+value+" : " + value + " > " + tree.data + " (look to right subtree)");	
				log.innerText +=  value + " < " + tree.data + '\n' + "Идем в право\n\n"

				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				if (tree.right!= null)
				{
					this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
					this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
					this.cmd("Step");
					this.cmd("Delete", this.highlightID);				
				}
				this.doFind(tree.right, value);						
			}
			
		}
		
	}
	else
	{
		log.innerText +=  "Элемент не найден\n"

		this.cmd("SetText", 0, "Searching for "+value+" : " + "< Empty Tree > (Element not found)");				
		this.cmd("Step");					
		this.cmd("SetText", 0, "Searching for "+value+" : " + " (Element not found)");					
	}
}



BST.prototype.insertElement = async function(insertedValue)
{
  let statusblock = document.getElementById("status")
  let infoblock = document.getElementById("infocode")
  statusblock.innerText = "";
  infoblock.innerHTML = "";
  infoblock.innerHTML = "<p class='infoHeader ifRoot'>Если корень не задан</p>";
  infoblock.innerHTML += "<p class='infoSubHeader enterRoot'>&nbsp;&nbsp;Задаем корень</p>"
  infoblock.innerHTML += "<p class='infoHeader ifLeft'>Если вставляемое значение < ключа</p>"
  infoblock.innerHTML += "<p class='infoSubHeader goLeft'>&nbsp;&nbsp;Идем в лево</p>"
  infoblock.innerHTML += "<p class='infoSubSubHeader ifEmptyKey'>&nbsp;&nbsp;&nbsp;&nbsp;Если нет ключа</p>"
  infoblock.innerHTML += "<p class='infoSubSubSubHeader insertKey'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Вставляем элемент</p>"
  infoblock.innerHTML += "<p class='infoHeader elseRight'>Иначе вправо</p>"
  infoblock.innerHTML += "<p class='infoSubHeader ifEmptyKey'>&nbsp;&nbsp;Если нет ключа</p>"
  infoblock.innerHTML += "<p class='infoSubSubHeader insertKey'>&nbsp;&nbsp;&nbsp;&nbsp;Вставляем элемент</p>"
  statusblock.style = "visibility: visible"
  infoblock.style = "visibility: visible"
  document.getElementById("test231").classList.add("rotateclass")
  document.getElementById("test232").classList.add("rotateclass")
  this.commands = new Array();  
  let ifRoot = document.getElementsByClassName("ifRoot")[0];
  ifRoot.classList.add('selectedrow')
  statusblock.innerText = "Вставляем " + insertedValue

  let enterRoot = document.getElementsByClassName("enterRoot")[0];

  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 1500);
    // doPlayPause();
    window.console.log('tyt1')
  }).then(() => {
    ifRoot.classList.remove('selectedrow')
    enterRoot.classList.add('selectedrow')
    window.console.log('tyt')
	
    this.highlightID = this.nextIndex++;
  }).then(async () => {
    if (this.treeRoot == null)
    {
      	this.cmd("CreateCircle", this.nextIndex, insertedValue,  this.startingX, BST.STARTING_Y);
		  this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)
			  this.clearCmd()

    	this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
		this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)
       	this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
		   this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)
       	this.cmd("Step");
	  	this.AnimationSteps = await this.commands
     this.animationManager.StartNewAnimation(this.commands)
	//   this.clearCmd()

      this.treeRoot = await new BSTNode(insertedValue, this.nextIndex, this.startingX, BST.STARTING_Y)
      this.nextIndex += 1;
    }
    else
    {
		let ifRoot = document.getElementsByClassName("ifRoot")[0];
		ifRoot.classList.remove('selectedrow')
		let enterRoot = document.getElementsByClassName("enterRoot")[0];
		enterRoot.classList.remove('selectedrow')
		let ifLeft = document.getElementsByClassName("ifLeft")[0];
		ifLeft.classList.add('selectedrow')
		new Promise(function(resolve, reject) {
			setTimeout(resolve, 1500);
			window.console.log('tyt1')
		  }).then(async()=>{
			await this.cmd("CreateCircle", this.nextIndex, insertedValue, 100, 100);
			this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)
			  this.clearCmd()

			await this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
			this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)
			await this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
			this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)
			await this.cmd("Step");
			this.AnimationSteps = await this.commands
      		await this.animationManager.StartNewAnimation(this.commands)

			var insertElem = await new BSTNode(insertedValue, this.nextIndex, 100, 100)
	  
			this.nextIndex += 1;
			await this.cmd("SetHighlight", insertElem.graphicID, 1);
			this.AnimationSteps = await this.commands
     		await this.animationManager.StartNewAnimation(this.commands)
			await new Promise(function(resolve, reject) {
				setTimeout(resolve, 10);
				// doPlayPause();
				window.console.log('tyt1')
			  }).then(async()=>{
				  this.clearCmd()
				await this.insert(insertElem, this.treeRoot)
			}).then(async()=>{
				await this.resizeTree();
				// this.AnimationSteps = this.commands
				// this.animationManager.StartNewAnimation(this.commands)

			})
		  })
    }
    await this.cmd("SetText", 0, "");
  }).then(() => {
    window.console.log('finaly')
    window.console.log(this.commands)
    // this.AnimationSteps = this.commands
    // this.animationManager.StartNewAnimation(this.commands)

  })
}

BST.prototype.insert = async function(elem, tree)
{


	let statusblock = document.getElementById("status")
	statusblock.innerText = "";
	statusblock.innerText = "Вставляем " + elem.data

	let ifLeft = document.getElementsByClassName("ifLeft")[0];
	let goLeft = document.getElementsByClassName("goLeft")[0];
	let ifEmptyKey = document.getElementsByClassName("ifEmptyKey")[0];
	let insertKey = document.getElementsByClassName("insertKey")[0];
	let elseRight = document.getElementsByClassName("elseRight")[0];
	let ifEmptyKey2 = document.getElementsByClassName("ifEmptyKey")[1];
	let insertKey2 = document.getElementsByClassName("insertKey")[1];
	ifLeft.classList.add('selectedrow')

	ifEmptyKey.classList.remove('selectedrow')
	ifEmptyKey2.classList.remove('selectedrow')

	this.cmd("SetHighlight", tree.graphicID , 1);
	this.AnimationSteps = await this.commands
    await this.animationManager.StartNewAnimation(this.commands)
	this.cmd("SetHighlight", elem.graphicID , 1);	
	this.AnimationSteps = await this.commands
    await this.animationManager.StartNewAnimation(this.commands)

	if (elem.data < tree.data)//elem data число которое ввели, treeвdata с которым сравниваем
	{
		await new Promise(function(resolve, reject) {
			setTimeout(resolve, 1);
			// doPlayPause();
			window.console.log('tyt1')
		  }).then(()=>{
			ifLeft.classList.remove('selectedrow')
			goLeft.classList.add('selectedrow')
		  })
		
		// doPlayPause();

	}
	else
	{
		await new Promise(function(resolve, reject) {
			setTimeout(resolve, 1);
			// doPlayPause();
			window.console.log('tyt1')
		  }).then(()=>{
			ifLeft.classList.remove('selectedrow')
			elseRight.classList.add('selectedrow')
			this.cmd("SetHighlight", tree.graphicID, 0);
			this.cmd("SetHighlight", elem.graphicID, 0);
			this.AnimationSteps = this.commands
      		this.animationManager.StartNewAnimation(this.commands)
		  })
		

						
	}
	this.cmd("Step");
	this.AnimationSteps = await this.commands
    await this.animationManager.StartNewAnimation(this.commands)
	this.cmd("SetHighlight", tree.graphicID, 0);
	this.AnimationSteps = await this.commands
    await this.animationManager.StartNewAnimation(this.commands)
	this.cmd("SetHighlight", elem.graphicID, 0);
	this.AnimationSteps = await this.commands
    await this.animationManager.StartNewAnimation(this.commands)
	
	
	if (elem.data < tree.data)
	{
		await new Promise(function(resolve, reject) {
			setTimeout(resolve, 1500);
			// doPlayPause();
			window.console.log('tyt1')
		  }).then(()=>{
			goLeft.classList.remove('selectedrow')
			ifEmptyKey.classList.add("selectedrow")
		  })
		
		if (tree.left == null)
		{	
			await new Promise(function(resolve, reject) {
				setTimeout(resolve, 1500);
				// doPlayPause();
				window.console.log('tyt1')
			  }).then(()=>{
				ifEmptyKey.classList.remove("selectedrow")
				insertKey.classList.add("selectedrow")
				// this.cmd("SetHighlight", elem.graphicID, 0);
				// this.AnimationSteps =  this.commands
       			// this.animationManager.StartNewAnimation(this.commands)


				this.cmd("SetHighlight", elem.graphicID, 0);
				this.AnimationSteps = this.commands
      			 this.animationManager.StartNewAnimation(this.commands)
				tree.left=elem;
				elem.parent = tree;
				this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
				this.AnimationSteps = this.commands
      			 this.animationManager.StartNewAnimation(this.commands)
			  })
			
						
		
			// this.cmd("SetHighlight", elem.graphicID, 0);
			// tree.left=elem;
			// elem.parent = tree;
			// this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
			// this.AnimationSteps = await this.commands
      		// await this.animationManager.StartNewAnimation(this.commands)
		}
		else
		{
			await new Promise(function(resolve, reject) {
				setTimeout(resolve, 1500);
				// doPlayPause();
				window.console.log('tyt1')
			  }).then(async()=>{
				ifEmptyKey.classList.remove("selectedrow")
				ifLeft.classList.add('selectedrow')
				this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				this.cmd("Step");
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				this.cmd("Delete", this.highlightID);
				
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				await new Promise(function(resolve, reject) {
					setTimeout(resolve, 1500);
					// doPlayPause();
					window.console.log('tyt1')
				  }).then(async()=>{
					  this.clearCmd()
					await this.insert(elem, tree.left);
				  })
			  })
			
		}
	}
	else
	{
		await new Promise(function(resolve, reject) {
			setTimeout(resolve, 1500);
			// doPlayPause();
			window.console.log('tyt1')
		  }).then(()=>{
			elseRight.classList.remove('selectedrow')
			ifEmptyKey2.classList.add("selectedrow")
		  })
		if (tree.right == null)
		{
			await new Promise(function(resolve, reject) {
				setTimeout(resolve, 1500);
				// doPlayPause();
				window.console.log('tyt1')
			  }).then(()=>{
				ifEmptyKey2.classList.remove("selectedrow")
				insertKey2.classList.add("selectedrow")
				// this.cmd("SetHighlight", elem.graphicID, 0);
				// this.AnimationSteps =  this.commands
       			// this.animationManager.StartNewAnimation(this.commands)

				   this.cmd("SetHighlight", elem.graphicID, 0);
				   tree.right=elem;
				   elem.parent = tree;
				   this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
				   elem.x = tree.x + BST.WIDTH_DELTA/2;
				   elem.y = tree.y + BST.HEIGHT_DELTA
				   this.cmd("Move", elem.graphicID, elem.x, elem.y);
				   this.AnimationSteps =  this.commands
			  this.animationManager.StartNewAnimation(this.commands)

			  })
	// 		this.cmd("SetHighlight", elem.graphicID, 0);
	// 		tree.right=elem;
	// 		elem.parent = tree;
	// 		this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
	// 		elem.x = tree.x + BST.WIDTH_DELTA/2;
	// 		elem.y = tree.y + BST.HEIGHT_DELTA
	// 		this.cmd("Move", elem.graphicID, elem.x, elem.y);
	// 		this.AnimationSteps = await this.commands
    //   await this.animationManager.StartNewAnimation(this.commands)
		}
		else
		{
			

			await new Promise(function(resolve, reject) {
				setTimeout(resolve, 1500);
				// doPlayPause();
				window.console.log('tyt1')
			  }).then(async()=>{
				ifEmptyKey2.classList.remove("selectedrow")
				ifLeft.classList.add('selectedrow')
				this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				this.cmd("Step");
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				this.cmd("Delete", this.highlightID);
				this.AnimationSteps = await this.commands
      await this.animationManager.StartNewAnimation(this.commands)
				await new Promise(function(resolve, reject) {
					setTimeout(resolve, 1500);
					// doPlayPause();
					window.console.log('tyt1')
				  }).then(async()=>{
					this.clearCmd()

					await this.insert(elem, tree.right);
				  })
			  })	
		}
	}
	
}

//******************************************************************************************* */
BST.prototype.insertElement1 = function(insertedValue)
{
	let log = document.getElementById('textblock')
	$('#infocode').css('width', '360px');
	$('#test232').addClass("rotateclass")


	this.commands = new Array();	
	this.cmd("SetText", 0, "Inserting "+insertedValue);
	log.innerText += "Вставляем " + insertedValue+'\n';
	this.highlightID = this.nextIndex++;
	
	if (this.treeRoot == null)
	{
		log.innerText += "Корень пустой. Задаём корень = " + insertedValue +'\n'+'\n';
		this.cmd("CreateCircle", this.nextIndex, insertedValue,  this.startingX, BST.STARTING_Y);
		this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
		this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
		this.cmd("Step");				
		this.treeRoot = new BSTNode(insertedValue, this.nextIndex, this.startingX, BST.STARTING_Y)
		this.nextIndex += 1;
	}
	else
	{
		this.cmd("CreateCircle", this.nextIndex, insertedValue, 100, 100);
		this.cmd("SetForegroundColor", this.nextIndex, BST.FOREGROUND_COLOR);
		this.cmd("SetBackgroundColor", this.nextIndex, BST.BACKGROUND_COLOR);
		this.cmd("Step");				
		var insertElem = new BSTNode(insertedValue, this.nextIndex, 100, 100)
		
		
		this.nextIndex += 1;
		this.cmd("SetHighlight", insertElem.graphicID, 1);
		this.insert1(insertElem, this.treeRoot)
		this.resizeTree();				
	}
	this.cmd("SetText", 0, "");				
	return this.commands;
}


BST.prototype.insert1 = function(elem, tree)
{
	let log = document.getElementById('textblock')

	this.cmd("SetHighlight", tree.graphicID , 1);
	this.cmd("SetHighlight", elem.graphicID , 1);
	
	if (elem.data < tree.data)//elem data число которое ввели, treeвdata с которым сравниваем
	{
		this.cmd("SetText", 0,  elem.data + " < " + tree.data + ".  Looking at left subtree");	
		console.log(elem.data + " < " + tree.data + ".  Looking at left subtree" + " идём в левую ветку")
		log.innerText += elem.data + " < " + tree.data + ".  Идём в левую ветку"+'\n'
	}
	else
	{
		this.cmd("SetText",  0, elem.data + " >= " + tree.data + ".  Looking at right subtree");		
		console.log(elem.data + " >= " + tree.data + ".  Looking at right subtree" + " идём в правую ветку")
		log.innerText += elem.data + " >= " + tree.data + ".  Идём в правую ветку"+'\n'
	}
	this.cmd("Step");
	this.cmd("SetHighlight", tree.graphicID, 0);
	this.cmd("SetHighlight", elem.graphicID, 0);
	
	if (elem.data < tree.data)
	{
		if (tree.left == null)
		{
			this.cmd("SetText", 0,"Found null tree, inserting element");	
			log.innerText += "Найден пустой лист. Вставляем элемент"	+'\n'	+'\n'	
			
			this.cmd("SetHighlight", elem.graphicID, 0);
			tree.left=elem;
			elem.parent = tree;
			this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
		}
		else
		{
			this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
			this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
			this.cmd("Step");
			this.cmd("Delete", this.highlightID);
			this.insert1(elem, tree.left);
		}
	}
	else
	{
		if (tree.right == null)
		{
			this.cmd("SetText",  0, "Found null tree, inserting element");		
			log.innerText += "Найден пустой лист. Вставляем элемент"	+'\n'+'\n'		
		
			this.cmd("SetHighlight", elem.graphicID, 0);
			tree.right=elem;
			elem.parent = tree;
			this.cmd("Connect", tree.graphicID, elem.graphicID, BST.LINK_COLOR);
			elem.x = tree.x + BST.WIDTH_DELTA/2;
			elem.y = tree.y + BST.HEIGHT_DELTA
			this.cmd("Move", elem.graphicID, elem.x, elem.y);
		}
		else
		{
			this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
			this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
			this.cmd("Step");
			this.cmd("Delete", this.highlightID);
			this.insert1(elem, tree.right);
		}
	}
	
	
}
/********************************************************************************************** */

BST.prototype.deleteElement = function(deletedValue)
{
	let log = document.getElementById('textblock')
	$('#infocode').css('width', '360px');
	$('#test232').addClass("rotateclass")
	window.console.log(log)
	log.innerText = "";
	this.commands = [];
	this.cmd("SetText", 0, "Deleting "+deletedValue);
	log.innerText += "Удаляем: "+deletedValue + '\n'+ '\n'
	this.cmd("Step");
	this.cmd("SetText", 0, "");
	this.highlightID = this.nextIndex++;
	this.treeDelete(this.treeRoot, deletedValue);
	this.cmd("SetText", 0, "");			
	// Do delete
	return this.commands;						
}

BST.prototype.treeDelete = function(tree, valueToDelete)
{
	let log = document.getElementById('textblock')

	var leftchild = false;
	if (tree != null)
	{
		if (tree.parent != null)
		{
			leftchild = tree.parent.left == tree;
		}
		this.cmd("SetHighlight", tree.graphicID, 1);
		if (valueToDelete < tree.data)
		{	
			this.cmd("SetText", 0, valueToDelete + " < " + tree.data + ".  Looking at left subtree");		
			log.innerText += valueToDelete + " < " + tree.data + ". Идем в левое поддерево"+ '\n'+ '\n'
		}
		else if (valueToDelete > tree.data)
		{
			this.cmd("SetText",  0, valueToDelete + " > " + tree.data + ".  Looking at right subtree");		
			log.innerText += valueToDelete + " < " + tree.data + ". Идем в правое поддерево"	+ '\n'	+ '\n'
		}
		else
		{
			this.cmd("SetText",  0, valueToDelete + " == " + tree.data + ".  Found node to delete");		
			log.innerText += valueToDelete + " == " + tree.data + ".\n Найден элемент для удаления"	+ '\n'	+ '\n'					
		}
		this.cmd("Step");
		this.cmd("SetHighlight",  tree.graphicID, 0);
		
		if (valueToDelete == tree.data)
		{
			if (tree.left == null && tree.right == null)
			{
				this.cmd("SetText", 0, "Node to delete is a leaf.  Delete it.");	
				log.innerText += "Узел для удаления лист. Удаляем его."	+ '\n'+ '\n'
				this.cmd("Delete", tree.graphicID);
				if (leftchild && tree.parent != null)
				{
					tree.parent.left = null;
				}
				else if (tree.parent != null)
				{
					tree.parent.right = null;
				}
				else
				{
					treeRoot = null;
				}
				this.resizeTree();				
				this.cmd("Step");
				
			}
			else if (tree.left == null)
			{
				this.cmd("SetText", 0, "Node to delete has no left child.  \nSet parent of deleted node to right child of deleted node.");	
				log.innerText += "Узел для удаления не имеет левого дочернего элемента.\n Установим родительский элемент удаленного узла на правый дочерний элемент удаленного узла."	+ '\n'+ '\n'								
				if (tree.parent != null)
				{
					this.cmd("Disconnect",  tree.parent.graphicID, tree.graphicID);
					this.cmd("Connect",  tree.parent.graphicID, tree.right.graphicID, BST.LINK_COLOR);
					this.cmd("Step");
					this.cmd("Delete", tree.graphicID);
					if (leftchild)
					{
						tree.parent.left = tree.right;
					}
					else
					{
						tree.parent.right = tree.right;
					}
					tree.right.parent = tree.parent;
				}
				else
				{
					this.cmd("Delete", tree.graphicID);
					this.treeRoot = tree.right;
					this.treeRoot.parent = null;
				}
				this.resizeTree();				
			}
			else if (tree.right == null)
			{
				this.cmd("SetText", 0, "Node to delete has no right child.  \nSet parent of deleted node to left child of deleted node.");	
				log.innerText += "Узел для удаления не имеет правого дочернего элемента.\n'\n' Установим родительский элемент удаленного узла на левый дочерний элемент удаленного узла."	+ '\n'+ '\n'								
								
				if (tree.parent != null)
				{
					this.cmd("Disconnect", tree.parent.graphicID, tree.graphicID);
					this.cmd("Connect", tree.parent.graphicID, tree.left.graphicID, BST.LINK_COLOR);
					this.cmd("Step");
					this.cmd("Delete", tree.graphicID);
					if (leftchild)
					{
						tree.parent.left = tree.left;								
					}
					else
					{
						tree.parent.right = tree.left;
					}
					tree.left.parent = tree.parent;
				}
				else
				{
					this.cmd("Delete",  tree.graphicID);
					this.treeRoot = tree.left;
					this.treeRoot.parent = null;
				}
				this.resizeTree();
			}
			else // tree.left != null && tree.right != null
			{
				this.cmd("SetText", 0, "Node to delete has two childern.  \nFind largest node in left subtree.");	
				log.innerText += "Узел для удаления имеет два дочерних элемента.\n\n Ищем наибольший узел в левом поддереве."	+ '\n'	+ '\n'								
								
				
				this.highlightID = this.nextIndex;
				this.nextIndex += 1;
				this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
				var tmp = tree;
				tmp = tree.left;
				this.cmd("Move", this.highlightID, tmp.x, tmp.y);
				this.cmd("Step");																									
				while (tmp.right != null)
				{
					tmp = tmp.right;
					this.cmd("Move", this.highlightID, tmp.x, tmp.y);
					this.cmd("Step");																									
				}
				this.cmd("SetText", tree.graphicID, " ");
				var labelID = this.nextIndex;
				this.nextIndex += 1;
				this.cmd("CreateLabel", labelID, tmp.data, tmp.x, tmp.y);
				tree.data = tmp.data;
				this.cmd("Move", labelID, tree.x, tree.y);
				this.cmd("SetText", 0, "Copy largest value of left subtree into node to delete.");			
				log.innerText += "Копируем наибольшее значение с левого поддерева в узел для удаления."	+ '\n'	+ '\n'								
						
				
				this.cmd("Step");
				this.cmd("SetHighlight", tree.graphicID, 0);
				this.cmd("Delete", labelID);
				this.cmd("SetText", tree.graphicID, tree.data);
				this.cmd("Delete", this.highlightID);							
				this.cmd("SetText", 0,"Remove node whose value we copied.");	
				log.innerText += "Удалить узел, значение которого мы скопировали"	+ '\n'	+ '\n'								
				
				if (tmp.left == null)
				{
					if (tmp.parent != tree)
					{
						tmp.parent.right = null;
					}
					else
					{
						tree.left = null;
					}
					this.cmd("Delete", tmp.graphicID);
					this.resizeTree();
				}
				else
				{
					this.cmd("Disconnect", tmp.parent.graphicID,  tmp.graphicID);
					this.cmd("Connect", tmp.parent.graphicID, tmp.left.graphicID, BST.LINK_COLOR);
					this.cmd("Step");
					this.cmd("Delete", tmp.graphicID);
					if (tmp.parent != tree)
					{
						tmp.parent.right = tmp.left;
						tmp.left.parent = tmp.parent;
					}
					else
					{
						tree.left = tmp.left;
						tmp.left.parent = tree;
					}
					this.resizeTree();
				}
				
			}
		}
		else if (valueToDelete < tree.data)
		{
			if (tree.left != null)
			{
				this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
				this.cmd("Move", this.highlightID, tree.left.x, tree.left.y);
				this.cmd("Step");
				this.cmd("Delete", this.highlightID);
			}
			this.treeDelete(tree.left, valueToDelete);
		}
		else
		{
			if (tree.right != null)
			{
				this.cmd("CreateHighlightCircle", this.highlightID, BST.HIGHLIGHT_CIRCLE_COLOR, tree.x, tree.y);
				this.cmd("Move", this.highlightID, tree.right.x, tree.right.y);
				this.cmd("Step");
				this.cmd("Delete", this.highlightID);
			}
			this.treeDelete(tree.right, valueToDelete);
		}
	}
	else
	{
		this.cmd("SetText", 0, "Elemet "+valueToDelete+" not found, could not delete");
		log.innerText += "Элемент не найден. Ничего не удаляем"	+ '\n'	+ '\n'								

	}
	
}

BST.prototype.resizeTree = function()
{
	var startingPoint  = this.startingX;
	this.resizeWidths(this.treeRoot);
	if (this.treeRoot != null)
	{
		if (this.treeRoot.leftWidth > startingPoint)
		{
			startingPoint = this.treeRoot.leftWidth;
		}
		else if (this.treeRoot.rightWidth > startingPoint)
		{
			startingPoint = Math.max(this.treeRoot.leftWidth, 2 * startingPoint - this.treeRoot.rightWidth);
		}
		this.setNewPositions(this.treeRoot, startingPoint, BST.STARTING_Y, 0);
		this.animateNewPositions(this.treeRoot);
		this.cmd("Step");
	}
	
}

BST.prototype.setNewPositions = function(tree, xPosition, yPosition, side)
{
	if (tree != null)
	{
		tree.y = yPosition;
		if (side == -1)
		{
			xPosition = xPosition - tree.rightWidth;
		}
		else if (side == 1)
		{
			xPosition = xPosition + tree.leftWidth;
		}
		tree.x = xPosition;
		this.setNewPositions(tree.left, xPosition, yPosition + BST.HEIGHT_DELTA, -1)
		this.setNewPositions(tree.right, xPosition, yPosition + BST.HEIGHT_DELTA, 1)
	}
	
}
BST.prototype.animateNewPositions = function(tree)
{
	if (tree != null)
	{
		this.cmd("Move", tree.graphicID, tree.x, tree.y);
		this.animateNewPositions(tree.left);
		this.animateNewPositions(tree.right);
	}
}

BST.prototype.resizeWidths = function(tree) 
{
	if (tree == null)
	{
		return 0;
	}
	tree.leftWidth = Math.max(this.resizeWidths(tree.left), BST.WIDTH_DELTA / 2);
	tree.rightWidth = Math.max(this.resizeWidths(tree.right), BST.WIDTH_DELTA / 2);
	return tree.leftWidth + tree.rightWidth;
}




function BSTNode(val, id, initialX, initialY)
{
	this.data = val;
	this.x = initialX;
	this.y = initialY;
	this.graphicID = id;
	this.left = null;
	this.right = null;
	this.parent = null;
}

BST.prototype.disableUI = function(event)
{
	this.insertField.disabled = true;
	this.insertButton.disabled = true;
	this.deleteField.disabled = true;
	this.deleteButton.disabled = true;
	this.findField.disabled = true;
	this.findButton.disabled = true;
	this.printButton.disabled = true;
	this.printRandButton.disabled = true;
	this.deleteTreeButton.disabled = true;
}

BST.prototype.enableUI = function(event)
{
	this.insertField.disabled = false;
	this.insertButton.disabled = false;
	this.deleteField.disabled = false;
	this.deleteButton.disabled = false;
	this.findField.disabled = false;
	this.findButton.disabled = false;
	this.printButton.disabled = false;
	this.printRandButton.disabled = false;
	this.deleteTreeButton.disabled = false;
}


var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new BST(animManag, canvas.width, canvas.height);
	
}





function addclass1(){

	window.console.log($('#test231').hasClass( "rotateclass" ))

	if ($('#test231').hasClass( "rotateclass" )) {
		$('#test231').removeClass("rotateclass")
	}
	else {
		$('#test231').addClass("rotateclass")
	}
}

function addclass2(){
	window.console.log($('#test232').hasClass( "rotateclass" ))
	if ($('#test232').hasClass( "rotateclass" )) {
		$('#test232').removeClass("rotateclass")
		// $('#infocode').style = "width: 0px;"

	}
	else {
		$('#test232').addClass("rotateclass")
		// $('#infocode').style= "width: 420px";
	}

	if ($('#infocode').css('width') == '360px') {
		$('#infocode').css('width', '0');
	}
	else{
		$('#infocode').css('width', '360px');

	}
}

function delhistory(){
	let log = document.getElementById('textblock')
	log.innerText = ""

}



