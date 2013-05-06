# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

#create the records for courses
Course.create(name: "stack",description: "Stack is one of the simplest abstract data types, it has Push and Pop operations with the priciple of Last-In-First-Out.")
Course.create(name: "queue",description: "Queue is another abstract data type, it has Enqueue and Dequeue operations with the priciple of First-In-First-Out.")
Course.create(name: "tree",description: "Tree is one of the advanced data structures. Each tree has a parent node with a list of child nodes looks like the hierarchical of a tree.")
Course.create(name: "bst",description: "Binary search tree is one type of the tree data structure, it has been sorted according to its principles. Click the link to see more details")



#create sections for stack
Section.create(name: "Definition", course_name: "stack", description: "A stack is a list with the restriction that inserts and deletes can be performed in only one position, namely the end of the list called the top. The fundamental operations on a stack are push, which is equivalent to an insert, and pop, which deletes the most recently inserted element. The most recently inserted element can be examined prior to performing a pop by use of the top routine.")
Section.create(name: "LIFO", course_name: "stack", description: "Stacks are sometimes known as LIFO (last in, first out) lists that pushes are input operations and pops and tops are output. The usual operations to make empty stacks and test for emptiness are part of the repertoire, but essentially all that you can do to a stack is push and pop. ")
Section.create(name: "Initialize the Stack", course_name: "stack", description: "Here is the code to initialize the Stack in C.", code: 
"void StackInit(stackT *stackP, int maxSize)
{
    stackElementT *newContents;

    /* Allocate a new array to hold the contents. */
    newContents = (stackElementT *)malloc(sizeof(stackElementT) * maxSize);
    if (newContents == NULL) {
      fprintf(stderr, 'Insufficient memory to initialize stack.\n');
      exit(1);  /* Exit, returning error code. */
    }

    stackP->contents = newContents;
    stackP->maxSize = maxSize;
    stackP->top = -1;  /* I.e., empty */
} ")

Section.create(name: "Stack Push", course_name: "stack", description: "Here is the code to implement the stack Push opereation.", code:
"void StackPush(stackT *stackP, stackElementT element)
{
  if (StackIsFull(stackP)) {
    fprintf(stderr, 'Can't push element on stack: stack is full.\n');
    exit(1);  /* Exit, returning error code. */
  }

  /* Put information in array; update top. */
  stackP->contents[++stackP->top] = element;
}")

Section.create(name: "Stack Pop", course_name: "stack", description: "Pop is occasionally written as a function that returns the popped element (and alters the stack). Although current thinking suggests that functions should not change their input variables. Here is the code to implement the stack Pop opereation.",code:
"stackElementT StackPop(stackT *stackP)
{
  if (StackIsEmpty(stackP)) {
    fprintf(stderr, 'Can't pop element from stack: stack is empty.\n');
    exit(1);  /* Exit, returning error code. */
  }

  return stackP->contents[stackP->top--];
}")

Section.create(name: "Stack Empty", course_name: "stack", description: "Empty is to empty the contents of the stack", code: 
"void StackDestroy(stackT *stackP)
{
	/* Get rid of array. */
	free(stackP->contents);

	stackP->contents = NULL;
	stackP->maxSize = 0;
	stackP->top = -1;  /* I.e., empty */
}")

# course name capitalize
Forum.create(name:"Stack",description:"")
Forum.create(name:"Queue",description:"")
Forum.create(name:"Tree",description:"")
Forum.create(name:"Bst",description:"")