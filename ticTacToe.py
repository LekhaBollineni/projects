import random

#Radom decision for the other player by computer
def cmpDecision(board):
    while True:
        row = random.randint(0,2)
        col = random.randint(0,2)
        cp_inp = (row,col)
        if board[row][col] is None:
            break
    return cp_inp

#check if the board is filled
def checkFilled(board):
    for i in range(3):
        for j in range(3):
            if board[i][j]==None:
                return None
    return 1 

#check if there is a winner
def checkWinner(board):
    for i in range(3):
        #Check rows
        if board[i][0]==board[i][1]==board[i][2]!=None:
            return board[i][0]
        
        #Check columns
        elif board[0][i]==board[1][i]==board[2][i]!=None:
            return board[i][0]
        
        #check diagonal
        elif board[0][0]==board[1][1]==board[2][2]!=None:
            return board[0][0]
        
        #check anti diagonal
        elif board[0][2]==board[1][1]==board[2][0]!=None:
            return board[0][2]
        
        else:
            return None
        



#create board
board = [[None, None, None],
         [None, None, None],
         [None, None, None]]

#players
player =["X", "O"]

turn = 0

while True:
    print(board)

    if turn == 0:
        try:
            row, col = input("Enter the row and column (in the form row column): ").split()
        except:
            print("invalid no.of input. Chack and input again:")
            continue
        row = int(row)
        col = int(col)
    else:
        row, col = cmpDecision(board)
        print(row)
        print(col)


    #check the input validity
    if row < 0 or row > 2 or col < 0 or col > 2 or board[row][col]!=None:
        print("Invalid move")
        continue

    else:
        #assign the square
        board[row][col] = player[turn]

        #Change the turn to next player
        turn = (turn + 1) % 2

        #Check if there is a winner or if the board is full
    winner = checkWinner(board)
    full = checkFilled(board)  

    #If there is a winner break loop
    if winner is not None:
        print(board)
        print(winner + " wins!!")
        break

    #if there is no winner but the baord is full, tie and break loop
    if full is not None and winner is None:
        print(board)
        print("Game is Tie")
        break
