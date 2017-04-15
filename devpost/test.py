import sys

def main(argv):
	if(len(argv) > 0):
		print('hello web! here\'s our post value -> ' + argv[0])
	else:
		print('hello web! no arguments')

if __name__ == '__main__':
	main(sys.argv[1:])