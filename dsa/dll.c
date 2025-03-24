#include<stdio.h>
#include<stdlib.h>


struct Node{
	int data;
	struct Node *prev;
	struct Node *next;
}


struct Node* createNode(int data){
	struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
	newNode->data = data;
	newNode->prev = NULL;
	newNode->next = NULL;
	return newNode;
};

void insertAtStart(struct Node **head,int data){
	struct Node * newNode = createNode(data);
	newNode->next = *head;

	if(*head !=NULL){
		(*head)->prev = newNode;
	}

	*head = newNode;
}

void printList(struct Node *node){
	struct Node *last;
	printf("Traversal in forward drection :\n");
	while(node !=NULL){
		printf("%d",node->data);
		last = node;
		node = node->next;
	}
	printf("\n");
}


void main(){
	struct Node *head  = NULL;
	int n, data;
	printf("Enter the number of node to insert at the start: ");
	scanf("%d",&n);
	
	for(int i=0; i<n;i++){
		printf("Enter data  to insert: ");
		scanf("%d",&data);
		insertAtStart(&head,data);
	}
	printList(head);
}
