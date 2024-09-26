typedef int data;

typedef struct node {
    data value;
    node* next;
} node;

node list_create_empty();
node list_create_from_array(data* array, int width);
void list_print(node* first_element);
void list_remove_last(node* first_element);
