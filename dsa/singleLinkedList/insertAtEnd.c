#include<stdio.h>
#include<stdlib.h>


struct Node{
	int data;
	struct Node* next;
};


void insertAtEnd(struct Node** head_ref,int new_data){
	struct Node* new_node =(struct Node*)malloc(sizeof(struct Node));
	new_node->data = new_data;
	new_node->next = NULL;
	
	if(*head_ref == NULL){
		*head_ref = new_node;
		return;
	}

	struct Node* temp = *head_ref;
	while(temp->next !=NULL){
		temp = temp->next;
	}
	temp->next = new_node;
}


void printList(struct Node* point){
	while(point != NULL){
		printf("%d-> ", point->data);
		point = point->next;
	}
	printf("\n");
}


void main(){
	struct Node* head=NULL;
	int n,data;
	
	printf("Enter a number you want to create node: ");
	scanf("%d",&n);

	for(int i=0;i<n;i++){
		printf("Enter a value :");
		scanf("%d",&data);
		insertAtEnd(&head,data);
	}
	printList(head);
}		
