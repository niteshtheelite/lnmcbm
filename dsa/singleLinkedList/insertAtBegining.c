#include<stdio.h>
#include<stdlib.h>


struct Node{
	int data;
	struct Node* next;
};

void insertAtBegining(struct Node** head_ref,int new_data){
	struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
	new_node->data = new_data;
	new_node->next = (*head_ref);
	(*head_ref) = new_node;
}


void printList(struct Node* point){
	while(point != NULL){
		printf("%d -> ",point->data);
		point = point->next;
	}
	printf("\n");
}


void main(){
	struct Node* head = NULL;
	int n,data;

	printf("Enter node you want to insert data:");
	scanf("%d",&n);
	for(int i=0;i<n;i++){
		printf("Enter data: ");
		scanf("%d",&data);
		insertAtBegining(&head,data);
	}

	printf("Linked List are : ");
	printList(head);
}
