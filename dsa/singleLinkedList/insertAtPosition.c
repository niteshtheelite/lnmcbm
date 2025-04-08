#include<stdio.h>
#include<stdlib.h>

struct Node{
	int data;
	struct Node* next;
};


void insertAtPosition(struct Node** head_ref,int new_data,int position){
	struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
	new_node->data = new_data;
	new_node->next = NULL;

	if(position == 0){
		new_node->next = *head_ref;
		*head_ref = new_node;
	}

	struct Node* temp = *head_ref;
	for(int i =0; temp != NULL && i< position-1;i++){
		temp = temp->next;
	}

	if(temp == NULL){
		printf("Node not inserted:");
		free(new_node);
		return;
	}

	new_node->next  = temp->next;
	temp->next = new_node;
}



void printList(struct Node* point){
	while(point != NULL){
		printf("%d-> ",point->data);
		point = point->next;
	}
	printf("\n");
}


void main(){
	struct Node* head = NULL;
	int n,data,position;

	printf("Enter a number your want to create: ");
	scanf("%d",&n);
	for(int i=0; i<n;i++){
		printf("Enter a value: ");
		scanf("%d",&data);
		insertAtPosition(&head,data,i);
	}

	printf("Print Linked List after intial :");
	printList(head);

	printf("Enter a value:");
	scanf("%d",&data);
	printf("Enter a position");
	scanf("%d",&position);
	insertAtPosition(&head,data,position);
	printList(head);
}
